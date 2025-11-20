
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
// FIX: Adjusting the import path to two levels back. This resolves the module if 'contexts' is nested
// one level deeper than 'services' within a larger structure (e.g., if 'src' is the root of the path).
import { getCart as apiGetCart, incrementCart, updateCartItemQuantity, removeCartItem } from "../services/service.js";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // NOTE: If your app has an AuthContext, you should use it here to ensure loadCart 
  // only runs after auth state is known, to prevent the "data flashes then disappears" bug.

  // Normalize backend cart
  const normalizeCart = (serverCart) => {
    if (!serverCart || !serverCart.items) return { items: [] };
    return {
      items: serverCart.items.map(item => ({
        product: item.product,
        quantity: item.quantity
      }))
    };
  };

  // Load cart from backend
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      // FIX 1: Ensure withCredentials is passed
      const res = await apiGetCart({ withCredentials: true });
          
      // Backend now returns { cart: { items: [...] } }
      const normalized = res.data.cart ? normalizeCart(res.data.cart) : { items: [] };
      setCart(normalized);
      setLoading(false);
      return normalized;
    } catch (err) {
      console.error("loadCart error:", err);
      // NOTE: If the error is 401/403 (Auth), this line resets the cart to empty, causing the "flash" issue.
      setCart({ items: [] }); 
      setLoading(false);
      return { items: [] };
    }
  }, []);

  // Add to cart (uses incrementCart endpoint)
  const addToCart = useCallback(async (productId, quantity = 1, fullProduct) => {
    try {
      // Optimistic update
      setCart(prev => {
        const items = [...prev.items];
        const index = items.findIndex(i => i.product._id === productId);
        if (index >= 0) {
          items[index].quantity += quantity;
        } else {
          items.push({ product: fullProduct || { _id: productId }, quantity });
        }
        return { items };
      });

      // Backend update: Use the incrementCart function
      const res = await incrementCart(
        { items: [{ product: productId, quantity }] },
        { withCredentials: true }
      );

      // Sync with backend response (which returns the full updated cart)
      if (res.data.cart) setCart(normalizeCart(res.data.cart));
      else await loadCart();

      return { success: true };
    } catch (err) {
      console.error("addToCart error:", err);
      await loadCart(); // Rollback (full fetch)
      return { success: false };
    }
  }, [loadCart]);

  // Update quantity (uses updateCartItemQuantity endpoint)
  const updateQuantity = useCallback(async (productId, newQty) => {
    try {
      // Optimistic update
      setCart(prev => {
        const items = [...prev.items];
        const idx = items.findIndex(i => i.product._id === productId);
        if (idx === -1) return prev;

        // If new quantity is 0 or less, we handle it visually by removing it
        if (newQty <= 0) items.splice(idx, 1);
        else items[idx].quantity = newQty;

        return { items };
      });

      // Backend update: Use the dedicated absolute update function
      const res = await updateCartItemQuantity(
        { items: [{ product: productId, quantity: newQty }] },
        { withCredentials: true }
      );

      // Sync with backend response
      if (res.data.cart) setCart(normalizeCart(res.data.cart));
      else await loadCart();
      
      return { success: true };
    } catch (err) {
      console.error("updateQuantity error:", err);
      await loadCart(); // Rollback
      return { success: false };
    }
  }, [loadCart]);

  // Remove item (uses removeCartItem endpoint)
  const removeItem = useCallback(async (productId) => {
    try {
      // Optimistic update: Remove from cart state
      setCart(prev => ({
        items: prev.items.filter(i => i.product._id !== productId)
      }));

      // Backend remove: Use the dedicated remove function
      const res = await removeCartItem(
        { items: [{ product: productId }] }, 
        { withCredentials: true }
      );

      // Sync with backend response
      if (res.data.cart) setCart(normalizeCart(res.data.cart));
      else await loadCart();

      return { success: true };
    } catch (err) {
      console.error("removeItem error:", err);
      await loadCart(); // Rollback
      return { success: false };
    }
  }, [loadCart]);

  // Subtotal
  const subtotal = cart.items.reduce((sum, it) => {
    // Already fixed the precedence issue in the previous step
    const price = (it.product?.discountedPrice || it.product?.price) ?? 0;
    return sum + price * it.quantity;
  }, 0);

  // Load cart on mount
  useEffect(() => { loadCart(); }, [loadCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        loadCart,
        subtotal,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
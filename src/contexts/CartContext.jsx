// src/contexts/CartContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCart as apiGetCart, createCart } from "../services/service";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      const res = await apiGetCart({ withCredentials: true });
      const normalized = res.data.cart ? normalizeCart(res.data.cart) : { items: [] };
      setCart(normalized);
      setLoading(false);
      return normalized;
    } catch (err) {
      console.error("loadCart error:", err);
      setLoading(false);
      return { items: [] };
    }
  }, []);

  // Add to cart
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

      // Backend update
      const res = await createCart(
        { items: [{ product: productId, quantity }] },
        { withCredentials: true }
      );

      if (res.data.cart) setCart(normalizeCart(res.data.cart));
      else await loadCart();

      return { success: true };
    } catch (err) {
      console.error("addToCart error:", err);
      await loadCart(); // rollback
      return { success: false };
    }
  }, [loadCart]);

  // Update quantity
  const updateQuantity = useCallback(async (productId, newQty) => {
    try {
      setCart(prev => {
        const items = [...prev.items];
        const idx = items.findIndex(i => i.product._id === productId);
        if (idx === -1) return prev;

        if (newQty <= 0) items.splice(idx, 1);
        else items[idx].quantity = newQty;

        return { items };
      });

      // Backend update (delta is now newQty)
      await createCart(
        { items: [{ product: productId, quantity: newQty }] },
        { withCredentials: true }
      );

      await loadCart(); // sync with backend
      return { success: true };
    } catch (err) {
      console.error("updateQuantity error:", err);
      await loadCart();
      return { success: false };
    }
  }, [loadCart]);

  // Remove item
  const removeItem = useCallback(async (productId) => {
    try {
      setCart(prev => ({
        items: prev.items.filter(i => i.product._id !== productId)
      }));

      // Backend remove (send negative quantity to remove)
      const res = await createCart(
        { items: [{ product: productId, quantity: -999 }] }, // use large negative to ensure removal
        { withCredentials: true }
      );

      if (res.data.cart) setCart(normalizeCart(res.data.cart));
      else await loadCart();

      return { success: true };
    } catch (err) {
      console.error("removeItem error:", err);
      await loadCart();
      return { success: false };
    }
  }, [loadCart]);

  // Subtotal
  const subtotal = cart.items.reduce((sum, it) => {
    const price = it.product?.price ?? 0;
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

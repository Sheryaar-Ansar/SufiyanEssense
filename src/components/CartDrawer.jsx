// src/components/CartDrawer.jsx
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useCart } from "../contexts/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, subtotal } = useCart();
    // console.log("cart drawer: ", cart)
    useEffect(() => {
        console.log("CartDrawer updated cart:", cart.items);
    }, [cart.items]);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    } flex flex-col`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800">
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {cart.items.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
                    ) : (
                        cart.items.map((item) => <CartItem key={item.product._id} item={item} />)
                    )}
                </div>

                {cart.items.length > 0 && (
                    <div className="p-6 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold text-gray-700">Subtotal:</span>
                            <span className="font-bold text-blue-600">Rs. {subtotal.toLocaleString()}</span>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-full font-bold shadow hover:bg-blue-700 transition-all">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;


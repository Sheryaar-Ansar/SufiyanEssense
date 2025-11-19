// src/components/CartItem.jsx
import React from "react";
import { Trash, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  console.log("cart item: ", item)

  const handleIncrement = () => {
    updateQuantity(item.product._id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product._id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.product._id);
  };

  return (
    <div className="flex gap-4 items-center p-4 border-b border-gray-200">
      <img
        src={`${import.meta.env.VITE_IMAGE_API}${item.product.images?.[0]}` || ""}
        alt={item.product.title}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{item.product.title}</h3>
          <button onClick={handleRemove} className="text-gray-400 hover:text-red-500 cursor-pointer">
            <Trash size={20} />
          </button>
        </div>
          <p>{item.product.bio}</p>
        <p className="text-blue-600 font-bold mt-1">
          Rs. {(item.product.discountedPrice || item.product.price)?.toLocaleString()}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrement}
            className="px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            -
          </button>
          <span className="px-3 py-1 border-t border-b border-gray-300">{item.quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

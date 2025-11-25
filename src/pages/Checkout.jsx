import React, { useState, useMemo } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import * as service from "../services/service";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

// --- PRICE CALCULATOR ---
const round2 = (num) => Math.round(num * 100) / 100;

const calculatePrices = (items) => {
    const subtotal = items.reduce(
        (sum, item) => sum + item.product.discountedPrice * item.quantity,
        0
    );

    const taxPrice = 0;
    const shippingPrice = subtotal >= 5000 ? 0 : 200;
    const total = round2(subtotal + shippingPrice + taxPrice);

    return {
        subtotal: round2(subtotal),
        shippingPrice,
        taxPrice,
        totalPrice: total,
    };
};

// --- ORDER SUMMARY ---
const OrderSummary = ({ items }) => {
    const prices = useMemo(() => calculatePrices(items), [items]);
    console.log(prices)

    return (
        <div className="lg:w-1/3 p-6 bg-white border border-gray-200 rounded-xl shadow-lg h-fit order-first lg:order-last">
            <div className="space-y-4 pb-4 border-b border-gray-200">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={item.product.images[0]}
                                alt={item.product.title}
                                className="w-16 h-16 object-cover rounded-lg border border-blue-200"
                            />
                            <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {item.quantity}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                                {item.product.title}
                            </h3>
                            <p className="text-xs text-gray-500">{item.product.format}</p>
                        </div>
                        <span className="font-medium text-gray-700">
                            Rs{" "}
                            {item.product.discountedPrice.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                            })}
                        </span>
                    </div>
                ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>
                        Subtotal - {items.reduce((sum, i) => sum + i.quantity, 0)} items
                    </span>
                    <span>
                        Rs {prices.subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        Shipping <span className="text-xs text-blue-500 cursor-help">ⓘ</span>
                    </span>
                    <span className="font-semibold text-gray-700">
                        {prices.shippingPrice === 0
                            ? <span className="text-green-600">FREE</span>
                            : `Rs ${prices.shippingPrice}`}
                    </span>
                </div>

                <div className="flex justify-between items-end pt-3 border-t border-gray-300">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900">Total</span>
                        <span className="text-xs text-gray-500">
                            Including Rs {prices.taxPrice.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                            })} in taxes
                        </span>
                    </div>
                    <span className="text-2xl font-extrabold text-blue-600">
                        PKR{" "}
                        {prices.totalPrice.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- DELIVERY FORM ---
const DeliveryForm = ({
    address,
    handleInputChange,
    handlePlaceOrder,
    paymentMethod,
    setPaymentMethod,
}) => {
    const inputClasses =
        "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm";

    return (
        <div className="lg:w-2/3 space-y-8">
            {/* Contact */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Contact</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={inputClasses}
                    value={address.email}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Delivery */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Delivery</h2>

                <div className="relative">
                    <select
                        name="country"
                        value={address.country}
                        onChange={handleInputChange}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                        <option value="Pakistan">Pakistan</option>
                        <option value="India">India</option>
                        <option value="Bangladesh">Bangladesh</option>
                    </select>
                    <ChevronDown
                        size={20}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        className={inputClasses}
                        value={address.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        className={inputClasses}
                        value={address.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className={inputClasses}
                    value={address.address}
                    onChange={handleInputChange}
                    required
                />

                <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment (optional)"
                    className={inputClasses}
                    value={address.apartment}
                    onChange={handleInputChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className={inputClasses}
                        value={address.city}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="altPhone"
                        placeholder="Alternate Phone (optional)"
                        className={inputClasses}
                        value={address.altPhone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="relative">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        className={inputClasses}
                        value={address.phone}
                        onChange={handleInputChange}
                        required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-help">
                        <MapPin size={20} />
                    </span>
                </div>

                {/* PAYMENT METHOD */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>

                    <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                            className="w-5 h-5 accent-blue-600"
                        />
                        <span className="font-medium text-gray-700">
                            Cash on Delivery (COD)
                        </span>
                    </label>
                </div>

                {/* SUBMIT ORDER */}
                <div className="flex justify-end pt-6">
                    <button
                        type="button"
                        onClick={handlePlaceOrder}
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN CHECKOUT PAGE ---
const Checkout = () => {
    const { cart, loadCart } = useCart();
    const navigate = useNavigate();
    const cartItems = cart?.items || [];

    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [address, setAddress] = useState({
        email: "",
        country: "Pakistan",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        altPhone: "",
        phone: "",
    });

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        try {
            const shippingAddress = {
                fullName: `${address.firstName} ${address.lastName}`,
                email: address.email,
                addressLine1: address.address,
                addressLine2: address.apartment,
                city: address.city,
                postalCode: "00000",
                country: address.country,
                phone: address.phone,
            };

            await service.createCheckout(
                { shippingAddress },
                { withCredentials: true }
            );
            loadCart()
            navigate("/thank-you");
        } catch (error) {
            alert(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-700">
            <header className="py-6 px-4 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-center">
                    <h1 className="text-3xl font-extrabold text-blue-800 tracking-wider">
                        Checkout Your Products
                    </h1>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-4 sm:p-8 lg:flex lg:gap-10">
                <div className="lg:w-2/3 py-8 order-last lg:order-first">
                    <DeliveryForm
                        address={address}
                        handleInputChange={handleInputChange}
                        handlePlaceOrder={handlePlaceOrder}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                </div>

                <OrderSummary items={cartItems} />
            </div>

            <footer className="border-t border-gray-200 py-4 mt-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
                    <p>Powered by React & Tailwind CSS</p>
                </div>
            </footer>
        </div>
    );
};

export default Checkout;

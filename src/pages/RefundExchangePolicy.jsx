// src/pages/RefundExchangePolicy.jsx
import React from "react";
import WhatsAppButton from "../components/WhatsappButton";
import { FaWhatsapp } from "react-icons/fa";

const RefundExchangePolicy = () => {
    const phoneNumber = "923182966076"; // <-- YOUR WHATSAPP NUMBER (without +)

    const openWhatsApp = () => {
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
    };
    return (
        <div className="max-w-5xl mx-auto p-6 md:p-12 bg-white shadow-md rounded-xl my-10">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-6">
                Refund & Exchange Policy
            </h1>

            <p className="text-gray-700 mb-4">
                At <strong>Sufiyan Essense</strong>, we want you to love your perfume. This Refund & Exchange Policy explains how returns and exchanges work for our products.
            </p>

            <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">
                1. Refunds
            </h2>
            <p className="text-gray-700 mb-2">
                You can request a refund within <strong>7 days</strong> of receiving your perfume under the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>The perfume bottle must have at least <strong>90% of the original quantity</strong> remaining.</li>
                <li>If less than 90% remains, we will <strong>not provide a refund</strong>.</li>
                <li>Refund requests must include proof of purchase (order number, invoice, or receipt).</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">
                2. Exchanges
            </h2>
            <p className="text-gray-700 mb-2">
                You can exchange a perfume for another perfume of the same quantity based on the remaining volume in your bottle:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>If you have used 20ml of a 50ml bottle, only the remaining 30ml can be exchanged.</li>
                <li>Exchanges must be for a perfume of the same quantity as the remaining perfume.</li>
                <li>We do not accept exchanges for bottles where less than 10% of the perfume remains.</li>
                <li>All exchanges must be requested within 7 days of delivery.</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">
                3. Process
            </h2>
            <p className="text-gray-700 mb-4">
                To request a refund or exchange:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li className="flex gap-x-3">Contact our support team at <a onClick={openWhatsApp} className="text-blue-600 underline flex gap-x-3 items-center justify-center"> WhatsApp. <FaWhatsapp /></a></li>
                <li>Provide your order number, product details, and reason for refund or exchange.</li>
                <li>Ship the product back to us if requested, securely packaged.</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">
                4. Important Notes
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Shipping costs for returns or exchanges may be applicable, unless the product is defective.</li>
                <li>Refunds are processed within 5–7 business days after we receive the returned product.</li>
                <li>Exchanges are processed as soon as we confirm the remaining quantity of the returned perfume.</li>
            </ul>

            <p className="text-gray-700 mt-8">
                <strong>Last Updated:</strong> November 20, 2025
            </p>
        </div>
    );
};

export default RefundExchangePolicy;

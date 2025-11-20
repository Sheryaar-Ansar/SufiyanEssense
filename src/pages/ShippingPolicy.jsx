// src/pages/ShippingPolicy.jsx
import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 bg-white shadow-md rounded-xl my-10">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8">
        Shipping Policy
      </h1>

      <p className="text-gray-700 mb-4">
        At <span className="font-semibold">Sufiyan Essense</span>, we are committed to delivering your favorite perfumes safely and promptly. Please read our shipping policy to understand our process.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">Processing Time</h2>
      <p className="text-gray-700 mb-4">
        Orders are typically processed within <span className="font-semibold">1-2 business days</span> after receiving your payment. You will receive a confirmation email once your order has been shipped.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">Shipping Methods & Delivery Time</h2>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          Standard Shipping: 3-7 business days.
        </li>
        <li>
          Express Shipping: 1-3 business days (additional charges may apply).
        </li>
        <li>
          Shipping times may vary depending on your location and local postal services.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">Shipping Charges</h2>
      <p className="text-gray-700 mb-4">
        Shipping charges are calculated based on the weight of your order and your delivery location. The final shipping cost will be displayed at checkout.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">International Shipping</h2>
      <p className="text-gray-700 mb-4">
        We currently ship within [Your Country]. For international orders, please contact our support team at <span className="text-blue-600 underline">support@sufiyanessence.com</span> for availability and shipping costs.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">Tracking Your Order</h2>
      <p className="text-gray-700 mb-4">
        Once your order is shipped, you will receive a tracking number via email. You can use this number to monitor your delivery status.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">Lost or Damaged Shipments</h2>
      <p className="text-gray-700 mb-4">
        In the unlikely event that your package is lost or damaged during transit, please contact our support team within 48 hours at <span className="text-blue-600 underline">support@sufiyanessence.com</span>. We will work with the courier to resolve the issue promptly.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">Contact Us</h2>
      <p className="text-gray-700 mb-4">
        If you have any questions regarding shipping, delivery times, or costs, please reach out to our customer support team at <span className="text-blue-600 underline">support@sufiyanessence.com</span>.
      </p>
    </div>
  );
};

export default ShippingPolicy;

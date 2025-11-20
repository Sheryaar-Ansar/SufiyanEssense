// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 bg-white shadow-md rounded-xl my-10">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-700 mb-4">
        At <strong>Sufiyan Essense</strong>, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or purchase our products.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">1. Information We Collect</h2>
      <p className="text-gray-700 mb-2">
        We may collect the following types of information:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Personal information such as name, email address, shipping address, and phone number when you place an order.</li>
        <li>Payment information, securely processed via third-party payment gateways.</li>
        <li>Non-personal information such as your IP address, browser type, and browsing behavior for website analytics.</li>
      </ul>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="text-gray-700 mb-2">
        We use your information for:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Processing and fulfilling your orders.</li>
        <li>Improving our website and customer experience.</li>
        <li>Sending promotional emails or updates if you have subscribed.</li>
        <li>Preventing fraud and ensuring secure transactions.</li>
      </ul>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">3. Data Sharing and Security</h2>
      <p className="text-gray-700 mb-2">
        We respect your privacy and do not sell or rent your personal information. We may share information with trusted third parties only to:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Process payments and orders.</li>
        <li>Deliver products via shipping services.</li>
        <li>Comply with legal obligations.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        We use reasonable security measures to protect your data, including encryption, secure servers, and limited access controls.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">4. Cookies and Tracking</h2>
      <p className="text-gray-700 mb-4">
        Our website uses cookies to enhance your experience, analyze website traffic, and personalize content. You can manage or disable cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">5. Your Rights</h2>
      <p className="text-gray-700 mb-4">
        You have the right to access, update, or delete your personal information. For any requests, please contact us at <a href="mailto:support@sufiyanessence.com" className="text-blue-600 underline">support@sufiyanessence.com</a>.
      </p>

      <h2 className="text-2xl font-bold text-blue-800 mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="text-gray-700 mb-4">
        We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated date.
      </p>

      <p className="text-gray-700 mt-8">
        <strong>Last Updated:</strong> November 20, 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;

import React, { useState } from "react";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9] px-4 sm:px-6 md:px-8 py-10">
      {/* Heading Section */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide uppercase leading-snug">
          Send Us a Message or Email Us at
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-bold mt-2 break-words">
          sufiyanessence@gmail.com
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 sm:p-8 md:p-10 rounded-none shadow-none"
      >
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm uppercase tracking-widest mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 py-3 px-4 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs sm:text-sm uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 py-3 px-4 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col mb-8">
          <label className="text-xs sm:text-sm uppercase tracking-widest mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
            className="border border-gray-300 py-3 px-4 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-black resize-none"
          />
        </div>

        {/* Send Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white uppercase tracking-widest px-10 py-3 text-xs sm:text-sm hover:bg-gray-800 transition-all"
          >
            Send
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-[10px] sm:text-xs text-center mt-8 text-gray-500 leading-relaxed">
          This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service apply.
        </p>
      </form>
    </div>
  );
};

export default AboutUs;

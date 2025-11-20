// src/pages/FAQs.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqsData = [
  {
    question: "How should I apply perfume?",
    answer: "Apply perfume on pulse points like wrists, behind the ears, inside elbows, and neck. These areas emit heat which helps the fragrance to develop fully."
  },
  {
    question: "When is the best time to apply perfume?",
    answer: "The best time to apply perfume is right after a shower, when your skin is clean and slightly moisturized. This helps the scent last longer."
  },
  {
    question: "How many sprays should I use?",
    answer: "Typically, 2–4 sprays are enough. Start with less; you can always add more if needed."
  },
  {
    question: "Can I layer perfumes?",
    answer: "Yes! Layering can create a unique scent. Apply a light fragrance first and then complement with another. Be cautious with strong scents to avoid overpowering."
  },
  {
    question: "Where should I not apply perfume?",
    answer: "Avoid applying perfume directly on clothing, jewelry, or irritated skin. Perfume reacts differently on fabric and can sometimes stain."
  },
  {
    question: "Does perfume expire?",
    answer: "Yes, most perfumes have a shelf life of 3–5 years if stored properly, away from sunlight and heat. Over time, the scent may change slightly."
  },
  {
    question: "Can I use perfume in hot weather?",
    answer: "Yes, but lighter scents like citrus or floral are ideal for hot weather. Heavy fragrances can be overwhelming in heat."
  },
  {
    question: "How should I store my perfume?",
    answer: "Keep perfume in a cool, dark place. Avoid bathrooms where humidity and heat can degrade the fragrance. Store bottles upright to prevent leakage."
  },
  {
    question: "Why does perfume smell different on my skin?",
    answer: "Fragrance reacts with your unique body chemistry, including skin type, pH, and diet. This is why the same perfume may smell slightly different on different people."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 bg-white shadow-md rounded-xl my-10">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8">
        Frequently Asked Questions (FAQs)
      </h1>

      <div className="space-y-4">
        {faqsData.map((faq, index) => (
          <div key={index} className="border border-blue-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 bg-blue-50 hover:bg-blue-100 transition"
            >
              <span className="text-lg font-semibold text-blue-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-blue-600" size={20} />
              ) : (
                <ChevronDown className="text-blue-600" size={20} />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-gray-700 mt-8">
        If you have any other questions, feel free to contact our support team at <a href="mailto:support@sufiyanessence.com" className="text-blue-600 underline">support@sufiyanessence.com</a>.
      </p>
    </div>
  );
};

export default FAQs;

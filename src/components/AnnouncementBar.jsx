import React, { useEffect, useState } from "react";

const messages = [
  "Buy any 3 perfumes in 5555",
  "Enjoy free shipping on orders above 5000",
  "12.12 Deals is live now",
  "Shop now to get more discounts",
];

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 500); // fade out time
    }, 3000); // total duration per message

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-blue-600 text-white text-center py-2 font-semibold text-sm md:text-2xl uppercase font-serif">
      <span
        className={`transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages[index]}
      </span>
    </div>
  );
};

export default AnnouncementBar;

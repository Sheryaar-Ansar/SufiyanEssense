// src/components/WhatsAppButton.jsx
import React from "react";
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    const phoneNumber = "923182966076"; // <-- YOUR WHATSAPP NUMBER (without +)

    const openWhatsApp = () => {
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
    };

    return (
        <button
            onClick={openWhatsApp}
            className="
                fixed 
                right-12 
                top-[90%] 
                -translate-y-1/2 
                bg-green-500 
                hover:bg-green-600 
                text-white 
                p-4 
                rounded-full 
                shadow-xl 
                cursor-pointer 
                z-50 
                transition 
                duration-200
            "
        >
            <FaWhatsapp size={38} />
        </button>
    );
};

export default WhatsAppButton;

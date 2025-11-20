import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // If user refreshes → send them to homepage
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-lg text-center border">
                <h1 className="text-4xl font-bold text-blue-700">Thank You!</h1>
                <p className="mt-4 text-gray-600 text-lg">
                    Your order has been placed successfully.
                </p>

                <p className="mt-2 text-gray-500 text-sm">
                    Redirecting you to the homepage...
                </p>
            </div>
        </div>
    );
};

export default ThankYou;

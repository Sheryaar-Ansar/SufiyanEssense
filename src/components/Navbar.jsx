// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
    Search,
    ShoppingBag,
    UserRound,
    Menu,
    X,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
    const { isCartOpen, setIsCartOpen } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPerfumeOpen, setIsPerfumeOpen] = useState(false);
    //   const [isCartOpen, setIsCartOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();
    const { cart } = useCart();

    const scrollThreshold = typeof window !== "undefined" ? window.innerHeight * 0.2 : 100;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > scrollThreshold) {
                setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
            } else {
                setScrollDirection("up");
            }
            setLastScrollY(currentScrollY > 0 ? currentScrollY : 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, scrollThreshold]);

    const linkClasses = "cursor-pointer relative transition-all duration-300 group";
    const linkAfter = 'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[3px] after:bg-blue-500 after:transition-all after:duration-300 after:group-hover:w-full after:group-hover:left-0';

    const totalCount = cart.items.reduce((s, it) => s + it.quantity, 0);

    useEffect(() => {
        console.log("navbar: ", cart);

    }, [cart])

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full bg-white shadow-xl shadow-blue-200/50 transition-transform duration-500 z-50 ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
                    <div className="hidden md:flex bg-white border border-blue-100 rounded-full items-center justify-between px-5 w-72 h-12 shadow-md shadow-blue-100/50 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                        <Search size={20} className="text-blue-500" />
                        <input type="search" className="h-full w-full outline-none text-md ml-3 placeholder-gray-400 bg-transparent" placeholder="Search" />
                    </div>

                    <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide cursor-pointer transition-transform duration-300 hover:scale-[1.02]" onClick={() => navigate("/")}>
                        Sufiyan Essense
                    </h1>

                    <div className="hidden md:flex gap-x-6 items-center">
                        <div className="flex items-center gap-x-2 cursor-pointer p-2 rounded-full hover:bg-blue-50 transition-colors">
                            <UserRound size={24} className="text-blue-600" />
                            <h1 className="text-sm font-semibold uppercase text-blue-800">Login</h1>
                        </div>

                        <div className="relative">
                            <div className="flex items-center gap-x-2 cursor-pointer p-2 rounded-full hover:bg-blue-50 transition-colors" onClick={() => setIsCartOpen(true)}>
                                <ShoppingBag size={24} className="text-blue-600" />
                                <h1 className="text-sm font-semibold uppercase text-blue-800">Cart</h1>
                            </div>

                            {totalCount > 0 && (
                                <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {totalCount}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                <div className="border-t border-blue-100/80 shadow-inner shadow-blue-50/50"></div>

                <div className="hidden md:flex justify-center py-3 relative">
                    <ul className="flex gap-x-10 text-base font-bold text-gray-700">
                        <li className={`${linkClasses} ${linkAfter}`} onClick={() => navigate("/")}>Home</li>

                        <li className={`relative group ${linkClasses}`}>
                            <div className={`flex items-center cursor-pointer select-none py-1 ${linkAfter}`} onClick={() => navigate("/perfumes")}>
                                <h1 className="text-blue-700">All Perfumes</h1>
                            </div>

                            <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white mt-3 p-4 rounded-xl shadow-2xl shadow-blue-400/30 min-w-[200px] z-30 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                                <ul className="flex flex-col gap-y-1 text-sm font-medium text-gray-700">
                                    <a className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Less than 1500</a>
                                    <a className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Less than 2000</a>
                                    <a className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Men</a>
                                    <a className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Women</a>
                                    <a className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">Best Seller</a>
                                    <a className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">New Arrival</a>
                                </ul>
                            </div>
                        </li>

                        <li className={`${linkClasses} ${linkAfter}`} onClick={() => navigate("/crazyDeals")}>Deals</li>
                        <li className={`${linkClasses} ${linkAfter}`} onClick={() => navigate("/contact")}>Contact Us</li>
                        <li className={`${linkClasses} ${linkAfter}`} onClick={() => navigate("/about")}>About Us</li>
                    </ul>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t-4 border-blue-500 py-6 px-6 shadow-inner shadow-blue-100/50 animate-slideDown" style={{ animationName: "slideDown", animationDuration: "0.3s" }}>
                        <div className="bg-gray-50 h-12 border border-blue-200 rounded-full flex items-center justify-between px-4 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Search size={20} className="text-blue-500" />
                            <input type="search" className="h-full w-full outline-none text-md ml-2 placeholder-gray-400 bg-transparent" placeholder="Search" />
                        </div>

                        <ul className="flex flex-col gap-y-4 text-lg font-bold uppercase text-blue-700">
                            <li className="p-2 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>Home</li>

                            <li>
                                <button onClick={() => setIsPerfumeOpen(!isPerfumeOpen)} className="flex justify-between items-center w-full text-left p-2 rounded-lg hover:bg-blue-50 transition-colors">
                                    <span>All Perfumes</span>
                                    {isPerfumeOpen ? <ChevronUp size={20} className="text-blue-600" /> : <ChevronDown size={20} className="text-blue-600" />}
                                </button>

                                {isPerfumeOpen && (
                                    <ul className="pl-6 mt-2 flex flex-col gap-y-1 text-base font-normal text-gray-600 bg-blue-50/50 p-2 rounded-lg">
                                        <li className="p-2 rounded-md hover:bg-blue-100/70 hover:text-blue-700">Less than 1500</li>
                                        <li className="p-2 rounded-md hover:bg-blue-100/70 hover:text-blue-700">Less than 2000</li>
                                        <li className="p-2 rounded-md hover:bg-blue-100/70 hover:text-blue-700">Men</li>
                                        <li className="p-2 rounded-md hover:bg-blue-100/70 hover:text-blue-700">Women</li>
                                        <li className="p-2 rounded-md hover:bg-blue-100/70 hover:text-blue-700">Best Seller</li>
                                        <li className="p-2 rounded-md hover:bg-blue-100/70 hover:text-blue-700">New Arrival</li>
                                    </ul>
                                )}
                            </li>

                            <li className="p-2 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => { navigate('/crazyDeals'); setIsMenuOpen(false); }}>Deals</li>
                            <li className="p-2 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => { navigate('/contact'); setIsMenuOpen(false); }}>Contact Us</li>
                            <li className="p-2 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => { navigate('/about'); setIsMenuOpen(false); }}>About Us</li>
                        </ul>

                        <div className="flex flex-col gap-y-3 mt-6 border-t border-blue-200 pt-4">
                            <button className="w-full flex items-center justify-center gap-x-3 bg-blue-600 text-white font-bold py-3 rounded-full shadow-lg shadow-blue-400/50 hover:bg-blue-700 transition-all duration-300">
                                <UserRound size={20} />
                                <span>Login</span>
                            </button>

                            <button onClick={() => setIsCartOpen(true)} className="w-full flex items-center justify-center gap-x-3 border border-blue-600 text-blue-600 font-bold py-3 rounded-full hover:bg-blue-50 transition-all duration-300">
                                <ShoppingBag size={20} />
                                <span>Cart</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;



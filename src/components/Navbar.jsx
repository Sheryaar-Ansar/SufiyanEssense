
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
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartDrawer from "./CartDrawer";
import * as service from '../services/service'
import AnnouncementBar from "./AnnouncementBar";
import se from '../assets/se.png'

const Navbar = () => {
    const { cart, isCartOpen, setIsCartOpen } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPerfumeOpen, setIsPerfumeOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = search.trim();
      if (!query) return;

      navigate(`/perfumes?search=${encodeURIComponent(query)}`);
      setSearch("");
    }
  };

    const location = useLocation();

    const totalCount = cart.items.reduce((s, it) => s + it.quantity, 0);

    const scrollThreshold =
        typeof window !== "undefined" ? window.innerHeight * 0.2 : 100;

    // Scroll hide navbar logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > scrollThreshold) {
                setScrollDirection(
                    currentScrollY > lastScrollY ? "down" : "up"
                );
            } else {
                setScrollDirection("up");
            }
            setLastScrollY(currentScrollY > 0 ? currentScrollY : 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, scrollThreshold]);

    // ---------- ACTIVE LINK LOGIC ----------
    const isActive = (path) => location.pathname === path;

    const activeLinkClass = "text-blue-700 ";
     const baseLinkClass = "cursor-pointer dutaion-300 transition-all group"
    //    "cursor-pointer relative transition-all duration-300 group after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[3px] after:bg-blue-500 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:left-0";

    // SUBMENU NAVIGATION
    const goTo = (query) => {
        navigate(`/perfumes?${query}`);
    };

    const openCart = () => setIsCartOpen(true);

    return (
        <>
            {/* Navbar Wrapper */}
            <nav
                className={`fixed top-0 left-0 w-full bg-white shadow-xl transition-transform duration-500 z-50 ${
                    scrollDirection === "down"
                        ? "-translate-y-full"
                        : "translate-y-0"
                }`}
            >
            <AnnouncementBar />

                {/* TOP BAR */}
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
                    
                    {/* SEARCH INPUT DESKTOP */}
                    <div className="hidden md:flex bg-white border border-blue-100 rounded-full items-center justify-between px-5 w-72 h-12 shadow-md hover:border-blue-300 transition-all duration-300">
                        <Search size={20} className="text-blue-500" />
                        <input
                            type="search"
                            className="h-full w-full outline-none text-md ml-3 bg-transparent"
                            placeholder="Search"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>

                    {/* LOGO */}
                    <h1
                        onClick={() => navigate("/")}
                        className="flex text-3xl font-extrabold text-blue-700 tracking-wide cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                        <img src={se} alt="" className="w-[100px]"/>
                        
                    </h1>

                    {/* RIGHT ICONS (DESKTOP) */}
                    <div className="hidden md:flex gap-x-6 items-center">
                        <div className="flex items-center gap-x-2 cursor-pointer p-2 rounded-full hover:bg-blue-50">
                            <UserRound size={24} className="text-blue-600" />
                            <h1 className="text-sm font-bold uppercase text-blue-800">
                                Login
                            </h1>
                        </div>

                        {/* CART */}
                        <div className="relative">
                            <div
                                className="flex items-center gap-x-2 cursor-pointer p-2 rounded-full hover:bg-blue-50"
                                onClick={openCart}
                            >
                                <ShoppingBag
                                    size={24}
                                    className="text-blue-600"
                                />
                                <h1 className="text-sm font-bold uppercase text-blue-800">
                                    Cart
                                </h1>
                            </div>

                            {totalCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {totalCount}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-full text-blue-600 hover:bg-blue-100"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                <div className="border-t border-blue-100"></div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex justify-center py-3">
                    <ul className="flex gap-x-10 text-base font-bold text-gray-700">

                        <li
                            className={`${baseLinkClass} ${
                                isActive("/") ? activeLinkClass : ""
                            }`}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </li>

                        {/* ALL PERFUMES + SUBMENU */}
                        <li className="relative group">
                            <div
                                className={`${baseLinkClass} flex items-center ${
                                    isActive("/perfumes") ? activeLinkClass : ""
                                }`}
                                onClick={() => navigate("/perfumes")}
                            >
                                <span className="">
                                    All Perfumes
                                </span>
                            </div>

                            {/* DROPDOWN */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white mt-3 p-4 rounded-xl shadow-xl min-w-[200px] z-30 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
                                <ul className="flex flex-col gap-y-1 text-sm font-medium text-gray-700">
                                    <div onClick={() => goTo("maxPrice=1500")} className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer">Less than 1500</div>
                                    <div onClick={() => goTo("maxPrice=2000")} className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer">Less than 2000</div>
                                    <div onClick={() => goTo("gender=men")} className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer">Men</div>
                                    <div onClick={() => goTo("gender=women")} className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer">Women</div>
                                    <div onClick={() => goTo("tag=best-seller")} className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer">Best Seller</div>
                                    <div onClick={() => goTo("tag=new-arrival")} className="p-2 rounded-lg hover:bg-blue-50 cursor-pointer">New Arrival</div>
                                </ul>
                            </div>
                        </li>

                        <li
                            className={`${baseLinkClass} ${
                                isActive("/deals") ? activeLinkClass : ""
                            }`}
                            onClick={() => navigate("/deals")}
                        >
                            Deals
                        </li>

                        <li
                            className={`${baseLinkClass} ${
                                isActive("/contact") ? activeLinkClass : ""
                            }`}
                            onClick={() => navigate("/contact")}
                        >
                            Contact Us
                        </li>

                        <li
                            className={`${baseLinkClass} ${
                                isActive("/about") ? activeLinkClass : ""
                            }`}
                            onClick={() => navigate("/about")}
                        >
                            About Us
                        </li>
                    </ul>
                </div>

                {/* MOBILE MENU */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t-4 border-blue-500 py-6 px-6">
                        <ul className="flex flex-col gap-y-4 text-lg font-bold uppercase text-blue-700">

                            <li onClick={() => { navigate("/"); setIsMenuOpen(false); }} className="p-2 rounded-lg hover:bg-blue-50">
                                Home
                            </li>

                            {/* MOBILE SUBMENU */}
                            <li>
                                <button
                                    onClick={() => setIsPerfumeOpen(!isPerfumeOpen)}
                                    className="flex justify-between items-center w-full p-2 rounded-lg hover:bg-blue-50"
                                >
                                    <span>All Perfumes</span>
                                    {isPerfumeOpen ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </button>

                                {isPerfumeOpen && (
                                    <ul className="pl-6 mt-2 flex flex-col gap-y-1 text-base font-normal text-gray-600 bg-blue-50 p-2 rounded-lg">
                                        <li onClick={() => goTo("maxPrice=1500")} className="p-2 rounded-md hover:bg-blue-100">Less than 1500</li>
                                        <li onClick={() => goTo("maxPrice=2000")} className="p-2 rounded-md hover:bg-blue-100">Less than 2000</li>
                                        <li onClick={() => goTo("gender=men")} className="p-2 rounded-md hover:bg-blue-100">Men</li>
                                        <li onClick={() => goTo("gender=women")} className="p-2 rounded-md hover:bg-blue-100">Women</li>
                                        <li onClick={() => goTo("tag=best-seller")} className="p-2 rounded-md hover:bg-blue-100">Best Seller</li>
                                        <li onClick={() => goTo("tag=new-arrival")} className="p-2 rounded-md hover:bg-blue-100">New Arrival</li>
                                    </ul>
                                )}
                            </li>

                            <li onClick={() => { navigate("/deals"); setIsMenuOpen(false); }} className="p-2 rounded-lg hover:bg-blue-50">Deals</li>
                            <li onClick={() => { navigate("/contact"); setIsMenuOpen(false); }} className="p-2 rounded-lg hover:bg-blue-50">Contact Us</li>
                            <li onClick={() => { navigate("/about"); setIsMenuOpen(false); }} className="p-2 rounded-lg hover:bg-blue-50">About Us</li>
                        </ul>

                        {/* MOBILE CTA BUTTONS */}
                        <div className="flex flex-col gap-y-3 mt-6 border-t border-blue-200 pt-4">
                            <button className="w-full flex items-center justify-center gap-x-3 bg-blue-600 text-white font-bold py-3 rounded-full shadow-lg hover:bg-blue-700">
                                <UserRound size={20} />
                                <span>Login</span>
                            </button>

                            <button
                                onClick={openCart}
                                className="w-full flex items-center justify-center gap-x-3 border border-blue-600 text-blue-600 font-bold py-3 rounded-full hover:bg-blue-50"
                            >
                                <ShoppingBag size={20} />
                                <span>Cart</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    );
};

export default Navbar;

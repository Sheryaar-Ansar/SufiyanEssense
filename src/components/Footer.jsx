import { Facebook, Instagram } from 'lucide-react';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16 mt-auto">

            {/* Main Footer Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">

                {/* About */}
                <div>
                    <h1 className="text-lg font-semibold text-white mb-3">About</h1>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">FAQs</li>
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Our Story</li>
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Media Page</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h1 className="text-lg font-semibold text-white mb-3">Support</h1>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Shipping Policy</li>
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Refund & Exchange</li>
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h1 className="text-lg font-semibold text-white mb-3">Quick Links</h1>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Ask For A Perfume</li>
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Bulk / Customize Orders</li>
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Blogs</li>
                    </ul>
                </div>

                {/* Get In Touch */}
                <div>
                    <h1 className="text-lg font-semibold text-white mb-3">Get In Touch</h1>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">+92 321 8984277</li>
                        <li className="hover:text-white transition-colors duration-200 cursor-pointer">Email Us</li>
                    </ul>
                </div>

                {/* Follow Us */}
                <div>
                    <h1 className="text-lg font-semibold text-white mb-3">Follow Us</h1>
                    <div className="flex items-center gap-x-4">
                        <a href="#" className="hover:text-blue-500 transition-colors duration-200">
                            <Facebook size={22} />
                        </a>
                        <a href="#" className="hover:text-pink-500 transition-colors duration-200">
                            <Instagram size={22} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto text-center pt-6 text-sm text-gray-400">
                <p>&copy; 2025 Sufiyan Essense Pvt Ltd. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    const quickLinks = [
        { href: '/', label: 'Home' },
        { href: 'about', label: 'About Us' },
        { href: 'products', label: 'Products' },
        { href: 'contact', label: 'Contact Us' },
    ];

    const supportLinks = [
        { href: 'contact', label: 'FAQ' },
        { href: 'contact', label: 'Contact Info' },
        { href: 'contact', label: 'Bakery Venue' },
    ];

    return (
        <footer className="bg-stone-800 text-stone-300">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <a href="/" className="flex items-center">
                            <span className="text-3xl font-bold text-orange-50" style={{ fontFamily: 'Pacifico, cursive' }}>
                                Brrdy
                            </span>
                        </a>
                        <p className="mt-4 text-stone-400 max-w-xs">
                            Discover the finest selection of products, curated with passion and delivered with care.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-4 space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-base hover:text-amber-400 transition-colors duration-300">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-3">
                            {supportLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-base hover:text-amber-400 transition-colors duration-300">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white tracking-wider uppercase">Stay Connected</h3>
                        <div className="mt-4 flex space-x-6">
                            <a href="#" aria-label="Facebook" className="hover:text-amber-400 transition-colors duration-300"><FaFacebookF className="h-5 w-5" /></a>
                            <a href="#" aria-label="Twitter" className="hover:text-amber-400 transition-colors duration-300"><FaTwitter className="h-5 w-5" /></a>
                            <a href="#" aria-label="Instagram" className="hover:text-amber-400 transition-colors duration-300"><FaInstagram className="h-5 w-5" /></a>
                            <a href="#" aria-label="YouTube" className="hover:text-amber-400 transition-colors duration-300"><FaYoutube className="h-5 w-5" /></a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-stone-700 flex justify-center">
                    <p className="text-sm text-stone-400">
                        © 2025 Brrdy. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
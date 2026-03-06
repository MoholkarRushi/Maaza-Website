"use client";
import { useEffect, useState } from "react";
import { AbstractLightningBananaIcon } from "./Icons";
import { motion } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-black/50 backdrop-blur-xl border-b border-white/10"
                    : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <AbstractLightningBananaIcon className="w-8 h-8 text-orange-500" />
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Nano Banana
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
                    <a href="#" className="hover:text-white transition-colors">Our Story</a>
                    <a href="#" className="hover:text-white transition-colors">Process</a>
                    <a href="#" className="hover:text-white transition-colors">Sustainability</a>
                    <a href="#" className="hover:text-white transition-colors">FAQ</a>
                </nav>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-shadow"
                >
                    Order Now
                </motion.button>
            </div>
        </header>
    );
}

"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const product = products[currentIndex];

    useEffect(() => {
        // Reset scroll when switching products
        window.scrollTo(0, 0);
        // Update global CSS variable for background gradient
        document.documentElement.style.setProperty("--product-gradient", product.gradient);
    }, [currentIndex, product.gradient]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <main className="relative w-full min-h-screen selection:bg-orange-500 selection:text-white">
            <Navbar />

            {/* Floating Arrows */}
            <div className="fixed top-1/2 left-4 z-40 -translate-y-1/2 hidden md:block">
                <button onClick={handlePrev} className="bg-black/20 hover:bg-black/60 text-white p-4 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg">
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="fixed top-1/2 right-4 z-40 -translate-y-1/2 hidden md:block">
                <button onClick={handleNext} className="bg-black/20 hover:bg-black/60 text-white p-4 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Bottom Pill Menu */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] md:w-auto">
                <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-2 py-2 md:px-6 md:py-3 flex justify-between md:justify-center items-center gap-2 md:gap-8 shadow-2xl overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {products.map((p, idx) => (
                        <button
                            key={p.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`text-sm font-bold tracking-wide transition-all px-4 py-2 rounded-full ${idx === currentIndex
                                    ? "bg-white/10 text-orange-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                                    : "text-white/50 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex-col flex"
                >
                    {/* Scroll sequence experience (The 500vh container) */}
                    <ProductBottleScroll product={product} />

                    {/* Product Details Section */}
                    <section className="w-full max-w-6xl mx-auto px-6 py-24 md:py-40 grid md:grid-cols-2 gap-16 relative z-30 bg-black/30 backdrop-blur-2xl rounded-[3rem] border border-white/10 my-16 md:my-32 overflow-hidden shadow-2xl">
                        {/* decorative circle */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col justify-center z-10">
                            <h3 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter">{product.detailsSection.title}</h3>
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 font-light">{product.detailsSection.description}</p>

                            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
                                {product.stats.map(stat => (
                                    <div key={stat.label}>
                                        <h5 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.val}</h5>
                                        <p className="text-xs md:text-sm text-white/50 uppercase tracking-wider font-semibold">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col justify-center bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 z-10 backdrop-blur-md">
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">{product.freshnessSection.title}</h3>
                            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 font-light">{product.freshnessSection.description}</p>
                            <ul className="space-y-5">
                                {product.features.map(f => (
                                    <li key={f} className="flex items-center gap-4 text-white/90 font-medium text-lg">
                                        <div className="bg-orange-500/20 p-2 rounded-full border border-orange-500/30">
                                            <Check className="text-orange-500 w-5 h-5" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </section>

                    {/* Buy Now Section */}
                    <section className="w-full max-w-4xl mx-auto px-6 py-24 mb-40 z-30">
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-10 md:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden backdrop-blur-2xl">
                            <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
                            <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center">
                                <h3 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter">Experience {product.name}</h3>
                                <div className="flex items-baseline gap-3 mb-12 justify-center">
                                    <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">{product.buyNowSection.price}</span>
                                    <span className="text-xl md:text-2xl text-white/60 font-medium">{product.buyNowSection.unit}</span>
                                </div>

                                <div className="flex flex-wrap gap-4 justify-center mb-14">
                                    {product.buyNowSection.processingParams.map(param => (
                                        <span key={param} className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-sm md:text-base font-semibold text-white/90 backdrop-blur-md">
                                            {param}
                                        </span>
                                    ))}
                                </div>

                                <button className="bg-white text-black text-xl md:text-2xl font-bold px-16 py-6 rounded-full hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-300 w-full sm:w-auto">
                                    Add to Cart
                                </button>

                                <div className="mt-16 grid sm:grid-cols-2 gap-10 text-left border-t border-white/10 pt-12">
                                    <div>
                                        <h6 className="text-white font-bold mb-3 flex items-center gap-2 text-lg"><Check className="w-5 h-5 text-orange-500" /> Delivery Promise</h6>
                                        <p className="text-base text-white/50 leading-relaxed font-light">{product.buyNowSection.deliveryPromise}</p>
                                    </div>
                                    <div>
                                        <h6 className="text-white font-bold mb-3 flex items-center gap-2 text-lg"><Check className="w-5 h-5 text-orange-500" /> Return Policy</h6>
                                        <p className="text-base text-white/50 leading-relaxed font-light">{product.buyNowSection.returnPolicy}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Next Flavor Button CTA */}
                    <div className="w-full bg-black py-32 border-t border-white/10 relative overflow-hidden flex justify-center z-30">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={handleNext}
                            className="text-4xl md:text-7xl font-black tracking-tighter text-white/20 hover:text-white transition-colors flex items-center gap-4 md:gap-8 group"
                        >
                            Next Flavor
                            <div className="bg-orange-500/20 p-4 rounded-full group-hover:bg-orange-500 group-hover:text-black transition-all">
                                <ChevronRight className="w-10 h-10 md:w-16 md:h-16 text-orange-500 group-hover:text-black" />
                            </div>
                        </motion.button>
                    </div>

                    <Footer />
                </motion.div>
            </AnimatePresence>
        </main>
    );
}

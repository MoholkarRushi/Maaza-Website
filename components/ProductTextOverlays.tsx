"use client";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
    product: Product;
    scrollYProgress: MotionValue<number>;
}

export default function ProductTextOverlays({ product, scrollYProgress }: Props) {
    // Mapping paragraphs to scroll progress
    // progress 0.0 to 0.2: section1
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, -50]);

    // progress 0.2 to 0.4: section2
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [50, 0, 0, -50]);

    // progress 0.4 to 0.6: section3
    const opacity3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [50, 0, 0, -50]);

    // progress 0.65 to 0.8: section4
    const opacity4 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [50, 0, 0, -50]);

    return (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center sm:justify-start sm:pl-[10%]">
            {/* Container for text */}
            <div className="w-full max-w-2xl px-6 relative h-full flex items-center">
                <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
                        {product.section1.title}
                    </h1>
                    <p className="text-2xl md:text-4xl text-white/90 font-light drop-shadow-md">
                        {product.section1.subtitle}
                    </p>
                </motion.div>

                <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
                        {product.section2.title}
                    </h2>
                    <p className="text-xl md:text-3xl text-white/90 font-light drop-shadow-md">
                        {product.section2.subtitle}
                    </p>
                </motion.div>

                <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
                        {product.section3.title}
                    </h2>
                    <p className="text-xl md:text-3xl text-white/90 font-light drop-shadow-md">
                        {product.section3.subtitle}
                    </p>
                </motion.div>

                <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-lg">
                        {product.section4.title}
                    </h2>
                    {product.section4.subtitle && (
                        <p className="text-xl md:text-3xl text-white/90 font-light drop-shadow-md">
                            {product.section4.subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

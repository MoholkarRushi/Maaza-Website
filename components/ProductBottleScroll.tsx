"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { Product } from "@/data/products";
import ProductTextOverlays from "./ProductTextOverlays";

interface Props {
    product: Product;
}

const FRAME_COUNT = 120;

export default function ProductBottleScroll({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesMap, setImagesMap] = useState<Map<number, HTMLImageElement>>(new Map());

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Preload images
    useEffect(() => {
        let mounted = true;
        const loadImages = async () => {
            const map = new Map<number, HTMLImageElement>();
            // Preload sequentially to ensure frames show up in order
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                img.src = `${product.folderPath}/${i}.webp`;
                await new Promise((resolve) => {
                    img.onload = () => {
                        map.set(i - 1, img);
                        resolve(true);
                    };
                    img.onerror = () => resolve(false);
                });
            }
            if (mounted) setImagesMap(new Map(map));
        };
        loadImages();

        return () => { mounted = false; };
    }, [product.folderPath]);

    // Render Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            const progress = scrollYProgress.get();
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(progress * FRAME_COUNT))
            );

            const img = imagesMap.get(frameIndex);
            if (img) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (imgRatio > canvasRatio) {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
        };
    }, [scrollYProgress, imagesMap]);

    return (
        <div ref={containerRef} className="h-[500vh] relative w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full object-cover z-10" />
                <ProductTextOverlays product={product} scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}

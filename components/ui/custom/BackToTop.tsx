"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Handle scroll detection
        const handleScroll = () => {
            // Show button when scrolled down 300px
            setIsVisible(window.scrollY > 300);

            // Calculate scroll progress for the ring
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };

        // Initial checks
        checkMobile();
        handleScroll();

        // Event listeners
        window.addEventListener("resize", checkMobile);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Only show on mobile and when page is scrolled
    if (!isMobile || !isVisible) {
        return null;
    }

    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    return (
        <div
            className={cn("fixed z-50 transition-all duration-300 ease-in-out", "bottom-20 right-4 group", "md:hidden")}
        >
            {/* Pulse ring effect - Layer 1 */}
            <div className="absolute inset-0 rounded-full bg-red-300 animate-ping opacity-20" />

            {/* Pulse ring effect - Layer 2 */}
            <div
                className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-30"
                style={{ animationDelay: "0.5s" }}
            />

            {/* Main button container */}
            <Button
                onClick={scrollToTop}
                size="icon"
                className={cn(
                    "relative h-14 w-14 rounded-full shadow-xl",
                    "bg-red-500/90 text-primary-foreground hover:bg-red-600/90 shadow-md",
                    "transition-all duration-300 ease-in-out",
                    "hover:scale-110 active:scale-95",
                    "animate-in fade-in slide-in-from-bottom-5 duration-300",
                    "overflow-hidden"
                )}
                aria-label="Kembali ke atas"
            >
                {/* Progress ring container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Progress ring - Background circle */}
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 44 44">
                        <circle
                            cx="22"
                            cy="22"
                            r={radius}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="2"
                        />
                        <circle
                            cx="22"
                            cy="22"
                            r={radius}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.9)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - (scrollProgress / 100) * circumference}
                            className="transition-all duration-150 ease-out"
                            style={{
                                filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))",
                            }}
                        />
                    </svg>
                </div>

                {/* Icon */}
                <ArrowUp className="relative z-10 h-6 w-6 animate-bounce-gentle drop-shadow-sm" />
            </Button>

            {/* Tooltip */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    Kembali ke atas
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
                </div>
            </div>
        </div>
    );
}

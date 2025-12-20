"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hook for detecting if device is mobile and prefers reduced motion
const useAnimationSettings = () => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const checkReducedMotion = () => {
            if (typeof window !== "undefined") {
                const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
                setPrefersReducedMotion(mediaQuery.matches);

                const handleChange = (e: MediaQueryListEvent) => {
                    setPrefersReducedMotion(e.matches);
                };

                mediaQuery.addEventListener("change", handleChange);
                return () => mediaQuery.removeEventListener("change", handleChange);
            }
        };

        checkMobile();
        checkReducedMotion();

        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return {
        isMobile,
        prefersReducedMotion,
        shouldAnimate: !isMobile && !prefersReducedMotion,
    };
};

// Animated Section Component
interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "rotate";
    delay?: number;
    duration?: number;
    staggerChildren?: number;
    as?: keyof React.JSX.IntrinsicElements;
}

const AnimatedSection = ({
    children,
    className,
    animation = "fadeIn",
    delay = 0,
    duration = 0.5,
    staggerChildren = 0,
    as = "div",
}: AnimatedSectionProps) => {
    const { shouldAnimate } = useAnimationSettings();

    const animations = {
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
        slideUp: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
        },
        slideDown: {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
        },
        slideLeft: {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
        },
        slideRight: {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 20 },
        },
        scale: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
        },
        rotate: {
            initial: { opacity: 0, rotate: -5 },
            animate: { opacity: 1, rotate: 0 },
            exit: { opacity: 0, rotate: 5 },
        },
    };

    const selectedAnimation = animations[animation];

    if (!shouldAnimate) {
        // Return static component if animations should be disabled
        if (as === "div") {
            return <div className={className}>{children}</div>;
        } else if (as === "section") {
            return <section className={className}>{children}</section>;
        } else if (as === "article") {
            return <article className={className}>{children}</article>;
        } else if (as === "header") {
            return <header className={className}>{children}</header>;
        } else if (as === "footer") {
            return <footer className={className}>{children}</footer>;
        } else if (as === "main") {
            return <main className={className}>{children}</main>;
        } else {
            return <div className={className}>{children}</div>;
        }
    }

    if (as === "div") {
        return (
            <motion.div
                className={className}
                initial={selectedAnimation.initial}
                animate={selectedAnimation.animate}
                exit={selectedAnimation.exit}
                transition={{
                    duration,
                    delay,
                    staggerChildren,
                    ease: "easeOut",
                }}
            >
                {children}
            </motion.div>
        );
    } else if (as === "section") {
        return (
            <motion.section
                className={className}
                initial={selectedAnimation.initial}
                animate={selectedAnimation.animate}
                exit={selectedAnimation.exit}
                transition={{
                    duration,
                    delay,
                    staggerChildren,
                    ease: "easeOut",
                }}
            >
                {children}
            </motion.section>
        );
    } else {
        return (
            <motion.div
                className={className}
                initial={selectedAnimation.initial}
                animate={selectedAnimation.animate}
                exit={selectedAnimation.exit}
                transition={{
                    duration,
                    delay,
                    staggerChildren,
                    ease: "easeOut",
                }}
            >
                {children}
            </motion.div>
        );
    }
};

// Animated List Component for staggered animations
interface AnimatedListProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale";
    staggerDelay?: number;
    as?: keyof React.JSX.IntrinsicElements;
}

const AnimatedList = ({ children, className, animation = "fadeIn", staggerDelay = 0.1 }: AnimatedListProps) => {
    const { shouldAnimate } = useAnimationSettings();

    const animations = {
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
        },
        slideUp: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
        },
        slideDown: {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
        },
        slideLeft: {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
        },
        slideRight: {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
        },
        scale: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
        },
    };

    const selectedAnimation = animations[animation];

    if (!shouldAnimate) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            transition={{
                duration: 0.5,
                staggerChildren: staggerDelay,
                ease: "easeOut",
            }}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div
                    key={index}
                    transition={{
                        duration: 0.5,
                        delay: index * staggerDelay,
                        ease: "easeOut",
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

// Animated Presence Component for enter/exit animations
interface AnimatedPresenceProps {
    children: React.ReactNode;
    className?: string;
    mode?: "sync" | "wait" | "popLayout";
    initial?: boolean;
}

const AnimatedPresenceWrapper = ({ children, className, mode = "wait", initial = true }: AnimatedPresenceProps) => {
    const { shouldAnimate } = useAnimationSettings();

    if (!shouldAnimate) {
        return <div className={className}>{children}</div>;
    }

    return (
        <AnimatePresence mode={mode} initial={initial}>
            <div className={className}>{children}</div>
        </AnimatePresence>
    );
};

// Animated Container for layout animations
interface AnimatedContainerProps {
    children: React.ReactNode;
    className?: string;
    layout?: boolean;
    layoutId?: string;
}

const AnimatedContainer = ({ children, className, layout = true, layoutId }: AnimatedContainerProps) => {
    const { shouldAnimate } = useAnimationSettings();

    if (!shouldAnimate) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            layout={layout}
            layoutId={layoutId}
            transition={{
                duration: 0.3,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
};

// Pre-defined animation presets
export const animationPresets = {
    // Page transitions
    pageTransition: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3, ease: "easeInOut" },
    },

    // Card hover effects
    cardHover: {
        whileHover: { scale: 1.02, y: -4 },
        transition: { duration: 0.2, ease: "easeOut" },
    },

    // Button press effects
    buttonPress: {
        whileTap: { scale: 0.98 },
        transition: { duration: 0.1 },
    },

    // Staggered list animations
    staggeredContainer: {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    },

    staggeredItem: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: "easeOut" },
    },
};

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
    const [ref, setRef] = React.useState<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const { shouldAnimate } = useAnimationSettings();

    React.useEffect(() => {
        if (!ref || !shouldAnimate) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
            }
        );

        observer.observe(ref);

        return () => {
            observer.disconnect();
        };
    }, [ref, shouldAnimate]);

    return { ref: setRef, isVisible };
};

export {
    useAnimationSettings,
    AnimatedSection,
    AnimatedList,
    AnimatedPresenceWrapper,
    AnimatedContainer,
    useScrollAnimation,
};

export type { AnimatedSectionProps, AnimatedListProps, AnimatedPresenceProps, AnimatedContainerProps };

export default AnimatedSection;

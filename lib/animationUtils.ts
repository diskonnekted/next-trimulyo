// Animation utility functions and constants

export const ANIMATION_DURATIONS = {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
} as const;

export const ANIMATION_EASINGS = {
    easeIn: "easeIn",
    easeOut: "easeOut",
    easeInOut: "easeInOut",
    linear: "linear",
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
} as const;

export const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
} as const;

// Check if device is mobile
export const isMobileDevice = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < BREAKPOINTS.mobile;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Check if animations should be enabled
export const shouldEnableAnimations = () => {
    return !isMobileDevice() && !prefersReducedMotion();
};

// Common animation variants
export const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

export const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export const slideDownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const slideLeftVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export const slideRightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

export const scaleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

export const rotateVariants = {
    hidden: { opacity: 0, rotate: -5 },
    visible: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 5 },
};

// Stagger animation variants
export const staggerContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
    exit: {},
};

export const staggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

// Page transition variants
export const pageTransitionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

// Modal animation variants
export const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

export const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: ANIMATION_DURATIONS.normal,
            ease: ANIMATION_EASINGS.smooth,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: {
            duration: ANIMATION_DURATIONS.fast,
            ease: ANIMATION_EASINGS.easeIn,
        },
    },
};

// Toast notification variants
export const toastVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: ANIMATION_DURATIONS.normal,
            ease: ANIMATION_EASINGS.bounce,
        },
    },
    exit: {
        opacity: 0,
        y: 50,
        scale: 0.9,
        transition: {
            duration: ANIMATION_DURATIONS.fast,
            ease: ANIMATION_EASINGS.easeIn,
        },
    },
};

// Hover animation configs
export const hoverConfigs = {
    card: {
        whileHover: {
            y: -4,
            scale: 1.02,
            transition: {
                duration: ANIMATION_DURATIONS.normal,
                ease: ANIMATION_EASINGS.smooth,
            },
        },
        whileTap: {
            scale: 0.98,
            transition: {
                duration: ANIMATION_DURATIONS.fast,
            },
        },
    },
    button: {
        whileHover: {
            scale: 1.05,
            transition: {
                duration: ANIMATION_DURATIONS.fast,
            },
        },
        whileTap: {
            scale: 0.95,
            transition: {
                duration: ANIMATION_DURATIONS.fast,
            },
        },
    },
    link: {
        whileHover: {
            x: 4,
            transition: {
                duration: ANIMATION_DURATIONS.fast,
            },
        },
    },
};

// Animation timing functions
export const getTransition = (
    duration: keyof typeof ANIMATION_DURATIONS = "normal",
    easing: keyof typeof ANIMATION_EASINGS = "smooth"
) => ({
    duration: ANIMATION_DURATIONS[duration],
    ease: ANIMATION_EASINGS[easing],
});

// Delay utility for staggered animations
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => {
    return index * baseDelay;
};

// Scroll-triggered animation utilities
export const getScrollTriggerConfig = (threshold: number = 0.1) => ({
    threshold,
    rootMargin: "50px 0px -50px 0px",
});

// Responsive animation utilities
export const getResponsiveAnimation = () => {
    const mobile = isMobileDevice();
    const reducedMotion = prefersReducedMotion();

    if (mobile || reducedMotion) {
        return {
            enabled: false,
            duration: 0,
            easing: "linear" as const,
        };
    }

    return {
        enabled: true,
        duration: ANIMATION_DURATIONS.normal,
        easing: ANIMATION_EASINGS.smooth,
    };
};

// Performance optimization utilities
export const optimizeAnimation = (elementCount: number) => {
    const mobile = isMobileDevice();

    if (mobile) {
        return {
            enabled: false,
            reason: "Mobile device detected",
        };
    }

    if (elementCount > 50) {
        return {
            enabled: true,
            reduced: true,
            staggerDelay: 0.05,
            duration: ANIMATION_DURATIONS.fast,
            reason: "High element count detected",
        };
    }

    return {
        enabled: true,
        reduced: false,
        staggerDelay: 0.1,
        duration: ANIMATION_DURATIONS.normal,
        reason: "Optimal conditions",
    };
};

// Animation presets for common use cases
export const animationPresets = {
    // Hero section animations
    hero: {
        title: {
            ...slideUpVariants,
            transition: getTransition("slow", "smooth"),
        },
        subtitle: {
            ...slideUpVariants,
            transition: { ...getTransition("normal", "smooth"), delay: 0.2 },
        },
        cta: {
            ...slideUpVariants,
            transition: { ...getTransition("normal", "smooth"), delay: 0.4 },
        },
    },

    // Card grid animations
    cardGrid: {
        container: staggerContainerVariants,
        item: {
            ...staggerItemVariants,
            transition: getTransition("normal", "smooth"),
        },
    },

    // Navigation animations
    navigation: {
        drawer: {
            hidden: { x: "100%" },
            visible: { x: 0 },
            exit: { x: "100%" },
            transition: getTransition("normal", "smooth"),
        },
        dropdown: {
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            transition: getTransition("fast", "smooth"),
        },
    },

    // Loading animations
    loading: {
        spinner: {
            animate: { rotate: 360 },
            transition: {
                duration: 1,
                ease: "linear",
                repeat: Infinity,
            },
        },
        pulse: {
            animate: { opacity: [0.5, 1, 0.5] },
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
        skeleton: {
            animate: { opacity: [0.3, 0.5, 0.3] },
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
    },
};

// Default export
const animationUtils = {
    ANIMATION_DURATIONS,
    ANIMATION_EASINGS,
    BREAKPOINTS,
    isMobileDevice,
    prefersReducedMotion,
    shouldEnableAnimations,
    fadeInVariants,
    slideUpVariants,
    slideDownVariants,
    slideLeftVariants,
    slideRightVariants,
    scaleVariants,
    rotateVariants,
    staggerContainerVariants,
    staggerItemVariants,
    pageTransitionVariants,
    modalOverlayVariants,
    modalContentVariants,
    toastVariants,
    hoverConfigs,
    getTransition,
    getStaggerDelay,
    getScrollTriggerConfig,
    getResponsiveAnimation,
    optimizeAnimation,
    animationPresets,
};

export default animationUtils;

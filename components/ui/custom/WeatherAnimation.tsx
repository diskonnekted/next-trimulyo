"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { WeatherAnimationData } from "@/hooks/useWeatherAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

interface Particle {
    id: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    size: number;
    opacity: number;
    animationDuration: number;
}

interface WeatherAnimationProps {
    weatherData: WeatherAnimationData | null;
    className?: string;
}

const RainParticle: React.FC<{ particle: Particle; intensity: "light" | "medium" | "heavy" }> = ({
    particle,
    intensity,
}) => {
    const getRainStyle = () => {
        const baseSpeed = intensity === "light" ? 0.8 : intensity === "medium" ? 1.2 : 1.8;
        const baseLength = intensity === "light" ? 15 : intensity === "medium" ? 20 : 25;

        // Stagger animation delay for continuous flow
        // eslint-disable-next-line react-hooks/purity
        const delay = Math.random() * 3;

        return {
            position: "absolute" as const,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${Math.max(particle.size, 1.5)}px`, // Minimum width for visibility
            // eslint-disable-next-line react-hooks/purity
            height: `${baseLength + Math.random() * 15}px`,
            background: `linear-gradient(to bottom,
                rgba(255, 255, 255, ${particle.opacity * 0.8}),
                rgba(174, 214, 241, ${particle.opacity * 0.6}),
                rgba(174, 214, 241, 0))`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            // eslint-disable-next-line react-hooks/purity
            animation: `rainFall ${baseSpeed + Math.random() * 0.5}s linear infinite`,
            animationDelay: `${delay}s`,
            transform: "rotate(0deg)",
            transformOrigin: "top center",
            boxShadow: `0 0 ${particle.size * 2}px rgba(174, 214, 241, ${particle.opacity * 0.3})`,
            willChange: "transform",
        };
    };

    return <div style={getRainStyle()} />;
};

const SunRay: React.FC<{ angle: number }> = ({ angle }) => {
    return (
        <div
            className="absolute w-1 bg-yellow-300/20"
            style={{
                height: "200%",
                top: "-50%",
                left: "50%",
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transformOrigin: "center center",
            }}
        />
    );
};

const Cloud: React.FC<{ particle: Particle; opacity: number }> = ({ particle, opacity }) => {
    return (
        <div
            className="absolute rounded-full bg-white/20 blur-sm"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size * 3}px`,
                height: `${particle.size * 2}px`,
                opacity,
                animation: `cloudFloat ${particle.animationDuration}s ease-in-out infinite`,
            }}
        />
    );
};

const FogParticle: React.FC<{ particle: Particle }> = ({ particle }) => {
    return (
        <div
            className="absolute rounded-full bg-gray-300/30 blur-md"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size * 4}px`,
                height: `${particle.size * 2}px`,
                opacity: particle.opacity,
                animation: `fogFloat ${particle.animationDuration}s ease-in-out infinite`,
            }}
        />
    );
};

const Leaf: React.FC<{ particle: Particle }> = ({ particle }) => {
    // Calculate a start position off-screen (left side) and end position off-screen (right side)
    const startX = -10; // Start 10% off left side
    const endX = 110; // End 10% off right side
    // eslint-disable-next-line react-hooks/purity
    const progress = Math.random(); // Random starting progress

    return (
        <div
            className="absolute w-4 h-3 bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 rounded-full pointer-events-none"
            style={{
                left: `${startX + (endX - startX) * progress}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
                animation: `leafFly ${particle.animationDuration}s linear infinite`,
                transform: `rotate(${particle.animationDuration * 45}deg)`,
            }}
        />
    );
};

const Star: React.FC<{
    x: number;
    y: number;
    size: number;
    animationDuration: number;
    delay: number;
}> = ({ x, y, size, animationDuration, delay }) => {
    return (
        <div
            className="absolute rounded-full bg-white"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
                animation: `twinkle ${animationDuration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
            }}
        />
    );
};

const Lightning: React.FC<{ active: boolean }> = ({ active }) => {
    if (!active) return null;

    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Remove the box-like white flash - use more natural illumination */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.3) 100%)",
                    animation: "lightningFlash 0.6s ease-out",
                }}
            />
            {/* Lightning bolt - more jagged and realistic */}
            <svg
                className="absolute top-0 left-1/2 w-16 h-32 md:w-20 md:h-40 pointer-events-none"
                style={{
                    animation: "lightningBolt 0.3s ease-out",
                    transform: "translateX(-50%)",
                }}
                viewBox="0 0 64 128"
                fill="none"
                stroke="white"
                strokeWidth="3"
            >
                <path d="M32 0 L28 48 L36 48 L24 96 L40 96 L16 128 L48 128" />
                <path d="M28 48 L32 48 M24 96 L40 96" strokeWidth="2" opacity="0.8" />
            </svg>
        </div>
    );
};

export const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ weatherData, className = "" }) => {
    const [lightningActive, setLightningActive] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    // Generate particles based on weather using useMemo
    // Note: Uses Math.random() for animation variety - acceptable for visual effects
    const particles = useMemo(() => {
        if (!weatherData) return [];

        /* eslint-disable react-hooks/purity */
        // Custom particle counts based on weather type and device
        const getParticleCount = () => {
            if (weatherData.isRaining && weatherData.isCloudy) {
                // Rain + Wind: both rain and leaves
                return { rain: isMobile ? 48 : 128, leaves: isMobile ? 15 : 8 };
            } else if (weatherData.isRaining) {
                return isMobile ? 48 : 128; // Custom rain particle counts
            } else if (weatherData.isCloudy) {
                return isMobile ? 6 : 20;
            } else if (weatherData.isFoggy) {
                return isMobile ? 8 : 25;
            }
            return isMobile ? 3 : 10; // Default for other weather types
        };

        const particleConfig = getParticleCount();
        const newParticles: Particle[] = [];

        // Generate rain particles
        if (weatherData.isRaining) {
            const rainCount = typeof particleConfig === "object" ? particleConfig.rain : particleConfig;
            for (let i = 0; i < rainCount; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: Math.random() * 2 + 1,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.4,
                    animationDuration: Math.random() * 10 + 10,
                });
            }
        }

        // Generate leaf particles for wind
        if (weatherData.isRaining && weatherData.isCloudy) {
            const leafCount = typeof particleConfig === "object" ? particleConfig.leaves : 0;
            const leafStartId = weatherData.isRaining
                ? typeof particleConfig === "object"
                    ? particleConfig.rain
                    : particleConfig
                : 0;
            for (let i = 0; i < leafCount; i++) {
                newParticles.push({
                    id: leafStartId + i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    speedX: (Math.random() - 0.5) * 4,
                    speedY: Math.random() * 2 + 0.5,
                    size: Math.random() * 8 + 6,
                    opacity: Math.random() * 0.4 + 0.4,
                    animationDuration: Math.random() * 8 + 6,
                });
            }
        }

        return newParticles;
        /* eslint-enable react-hooks/purity */
    }, [weatherData, isMobile]);

    // Lightning effect for stormy weather
    useEffect(() => {
        if (!weatherData?.isStormy) return;

        const lightningInterval = setInterval(
            () => {
                if (Math.random() > 0.6) {
                    // Slightly more frequent triggers
                    setLightningActive(true);
                    setTimeout(() => setLightningActive(false), 300);
                }
            },
            Math.random() * 3000 + 5000
        ); // 5-8 seconds random interval

        return () => clearInterval(lightningInterval);
    }, [weatherData?.isStormy]);

    // Generate stars for non-rainy weather using useMemo
    // Note: Uses Math.random() for animation variety - acceptable for visual effects
    const stars = useMemo(() => {
        if (weatherData && !weatherData.isRaining) {
            /* eslint-disable react-hooks/purity */
            const starCount = isMobile ? 50 : 100;
            const newStars = [];

            for (let i = 0; i < starCount; i++) {
                newStars.push({
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    animationDuration: Math.random() * 3 + 2,
                    delay: Math.random() * 5,
                });
            }

            return newStars;
            /* eslint-enable react-hooks/purity */
        }
        return [];
    }, [weatherData, isMobile]);

    if (!weatherData) return null;

    return (
        <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <style jsx>{`
                @keyframes rainFall {
                    from {
                        transform: translateY(-100vh) rotate(0deg);
                    }
                    to {
                        transform: translateY(100vh) rotate(0deg);
                    }
                }

                @keyframes cloudFloat {
                    0%,
                    100% {
                        transform: translateX(0) translateY(0);
                    }
                    25% {
                        transform: translateX(20px) translateY(-5px);
                    }
                    50% {
                        transform: translateX(-10px) translateY(5px);
                    }
                    75% {
                        transform: translateX(15px) translateY(-3px);
                    }
                }

                @keyframes fogFloat {
                    0%,
                    100% {
                        transform: translateX(0) translateY(0) scale(1);
                    }
                    50% {
                        transform: translateX(30px) translateY(-10px) scale(1.1);
                    }
                }

                @keyframes leafFly {
                    0% {
                        transform: translateX(0) translateY(0) rotate(0deg) scale(1);
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    25% {
                        transform: translateX(100vw) translateY(-20px) rotate(180deg) scale(1.2);
                    }
                    50% {
                        transform: translateX(120vw) translateY(10px) rotate(360deg) scale(0.8);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateX(150vw) translateY(-30px) rotate(540deg) scale(0.6);
                        opacity: 0;
                    }
                }

                @keyframes lightningFlash {
                    0%,
                    100% {
                        opacity: 0;
                    }
                    20% {
                        opacity: 0.8;
                    }
                    40% {
                        opacity: 0.4;
                    }
                    60% {
                        opacity: 0.6;
                    }
                    80% {
                        opacity: 0.2;
                    }
                }

                @keyframes lightningBolt {
                    0% {
                        opacity: 0;
                        transform: scaleY(0) translateY(-100%);
                    }
                    20% {
                        opacity: 1;
                        transform: scaleY(1) translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: scaleY(1) translateY(100%);
                    }
                }

                @keyframes sunPulse {
                    0%,
                    100% {
                        opacity: 0.2;
                    }
                    50% {
                        opacity: 0.4;
                    }
                }

                @keyframes sunRotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes twinkle {
                    0%,
                    100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.2);
                    }
                }
            `}</style>

            {/* Rain Animation */}
            {weatherData.isRaining && (
                <>
                    {particles
                        .filter((p) => !weatherData.isCloudy || p.id < (isMobile ? 48 : 128))
                        .map((particle) => (
                            <RainParticle key={particle.id} particle={particle} intensity={weatherData.intensity} />
                        ))}
                </>
            )}

            {/* Flying Leaves for Rain + Wind */}
            {weatherData.isRaining && weatherData.isCloudy && (
                <>
                    {particles
                        .filter((p) => p.id >= (isMobile ? 48 : 28))
                        .map((particle) => (
                            <Leaf key={particle.id} particle={particle} />
                        ))}
                </>
            )}

            {/* Sun Rays Animation */}
            {weatherData.isSunny && (
                <div className="absolute top-10 right-10 md:top-20 md:right-20">
                    <div
                        className="relative w-32 h-32 md:w-48 md:h-48"
                        style={{
                            animation: "sunRotate 60s linear infinite",
                        }}
                    >
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                            <SunRay key={angle} angle={angle} />
                        ))}
                        <div
                            className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl"
                            style={{
                                animation: "sunPulse 4s ease-in-out infinite",
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Cloud Animation */}
            {weatherData.isCloudy && (
                <>
                    {particles.slice(0, isMobile ? 6 : 20).map((particle) => (
                        <Cloud key={particle.id} particle={particle} opacity={0.3} />
                    ))}
                </>
            )}

            {/* Fog Animation */}
            {weatherData.isFoggy && (
                <>
                    {particles.map((particle) => (
                        <FogParticle key={particle.id} particle={particle} />
                    ))}
                </>
            )}

            {/* Lightning Effect */}
            <Lightning active={lightningActive} />

            {/* Starry Animation - shown when not raining */}
            {!weatherData.isRaining && (
                <>
                    {stars.map((star, index) => (
                        <Star
                            key={index}
                            x={star.x}
                            y={star.y}
                            size={star.size}
                            animationDuration={star.animationDuration}
                            delay={star.delay}
                        />
                    ))}
                </>
            )}

            {/* Additional effects for stormy weather */}
            {weatherData.isStormy && weatherData.isRaining && <div className="absolute inset-0 bg-gray-900/20" />}
        </div>
    );
};

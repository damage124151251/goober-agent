'use client';

import { motion } from 'framer-motion';

interface LoadingScreenProps {
    isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
    if (!isLoading) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0D0D0D]"
        >
            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)'
                }}
            />

            {/* Grid background */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="relative flex flex-col items-center">
                {/* Pixel Goober Logo */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative"
                >
                    {/* Glowing effect behind */}
                    <div className="absolute inset-0 blur-2xl bg-[#FF6B35] opacity-30 rounded-full scale-150" />

                    {/* Main pixel art container */}
                    <div className="relative w-32 h-32 pixel-corners bg-[#1A1A1A] border-4 border-[#FF6B35] flex items-center justify-center"
                        style={{
                            boxShadow: '8px 8px 0 rgba(0,0,0,0.8), 0 0 40px rgba(255, 107, 53, 0.3)'
                        }}
                    >
                        {/* Pixel Goober face */}
                        <div className="relative w-20 h-20">
                            {/* Orange background circle */}
                            <div className="absolute inset-0 bg-[#FF6B35] rounded-lg" />

                            {/* Eyes - blinking animation */}
                            <motion.div
                                animate={{
                                    scaleY: [1, 0.1, 1],
                                }}
                                transition={{
                                    duration: 0.2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                                className="absolute top-5 left-3 w-3 h-3 bg-white rounded-sm"
                            />
                            <motion.div
                                animate={{
                                    scaleY: [1, 0.1, 1],
                                }}
                                transition={{
                                    duration: 0.2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                                className="absolute top-5 right-3 w-3 h-3 bg-white rounded-sm"
                            />

                            {/* Pupils */}
                            <motion.div
                                animate={{
                                    x: [-1, 1, -1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="absolute top-6 left-4 w-1.5 h-1.5 bg-[#0D0D0D]"
                            />
                            <motion.div
                                animate={{
                                    x: [-1, 1, -1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="absolute top-6 right-4 w-1.5 h-1.5 bg-[#0D0D0D]"
                            />

                            {/* Confused mouth */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-2 bg-[#0D0D0D] rounded-sm"
                                style={{ transform: 'translateX(-50%) rotate(-5deg)' }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Loading text with glitch effect */}
                <motion.div
                    className="mt-8 relative"
                    animate={{
                        x: [0, -2, 2, 0],
                    }}
                    transition={{
                        duration: 0.1,
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                >
                    <h2
                        className="text-2xl text-[#FF6B35] tracking-widest"
                        style={{ fontFamily: "'Press Start 2P', cursive" }}
                    >
                        LOADING
                    </h2>
                </motion.div>

                {/* Pixel loading bar */}
                <div className="mt-6 w-64 h-6 bg-[#1A1A1A] border-2 border-[#A0A0A0] relative overflow-hidden">
                    <motion.div
                        className="h-full"
                        style={{
                            background: 'repeating-linear-gradient(90deg, #FF6B35, #FF6B35 8px, #FF8C5A 8px, #FF8C5A 16px)'
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    {/* Shine effect */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-white opacity-20" />
                </div>

                {/* Loading dots */}
                <div className="mt-4 flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-[#FF6B35]"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>

                {/* Random loading messages */}
                <motion.p
                    className="mt-6 text-[#666666] text-center max-w-xs"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    initializing cursed trading protocols...
                </motion.p>
            </div>
        </motion.div>
    );
}

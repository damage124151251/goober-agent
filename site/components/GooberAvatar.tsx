'use client';

import { motion } from 'framer-motion';

interface GooberAvatarProps {
    mentalState: string;
    sanity: number;
}

export default function GooberAvatar({ mentalState, sanity }: GooberAvatarProps) {
    const getEmoji = () => {
        switch (mentalState) {
            case 'CONFIDENT': return '😎';
            case 'NORMAL': return '🙂';
            case 'NERVOUS': return '😰';
            case 'COPIUM': return '🥴';
            case 'FULL_DEGEN': return '💀';
            default: return '🟠';
        }
    };

    const getAnimation = () => {
        switch (mentalState) {
            case 'CONFIDENT':
                return { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } };
            case 'NERVOUS':
                return { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 0.2 } };
            case 'COPIUM':
                return { rotate: [-5, 5, -5], transition: { repeat: Infinity, duration: 0.5 } };
            case 'FULL_DEGEN':
                return {
                    x: [-3, 3, -3],
                    y: [-3, 3, -3],
                    filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
                    transition: { repeat: Infinity, duration: 0.3 }
                };
            default:
                return { y: [0, -5, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } };
        }
    };

    const getGlowColor = () => {
        if (sanity >= 80) return 'rgba(74, 222, 128, 0.4)';
        if (sanity >= 60) return 'rgba(96, 165, 250, 0.4)';
        if (sanity >= 40) return 'rgba(251, 191, 36, 0.4)';
        if (sanity >= 20) return 'rgba(249, 115, 22, 0.4)';
        return 'rgba(239, 68, 68, 0.4)';
    };

    return (
        <motion.div
            animate={getAnimation()}
            className="relative"
        >
            {/* Glow Effect */}
            <div
                className="absolute inset-0 rounded-full blur-2xl opacity-60"
                style={{ background: getGlowColor() }}
            />

            {/* Avatar Container */}
            <div
                className="relative w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center cursed-card goober-glow"
                style={{
                    background: 'linear-gradient(135deg, #e07a3a 0%, #d4a574 50%, #e07a3a 100%)',
                    boxShadow: `0 0 40px ${getGlowColor()}`
                }}
            >
                {/* Face */}
                <div className="text-6xl md:text-8xl">
                    {getEmoji()}
                </div>

                {/* Sanity Indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-bg-secondary px-3 py-1 rounded-full border-2 border-goober-orange">
                        <span className="font-pixel text-lg">{sanity}%</span>
                    </div>
                </div>
            </div>

            {/* State Label */}
            <div className="text-center mt-4">
                <span className="text-sm text-white-muted uppercase tracking-wider">
                    {mentalState.replace('_', ' ')}
                </span>
            </div>
        </motion.div>
    );
}

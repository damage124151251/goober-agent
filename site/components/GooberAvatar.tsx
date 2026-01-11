'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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

    const getBorderColor = () => {
        if (sanity >= 80) return '#4ade80';
        if (sanity >= 60) return '#60a5fa';
        if (sanity >= 40) return '#fbbf24';
        if (sanity >= 20) return '#f97316';
        return '#ef4444';
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

            {/* Avatar Container with Frame */}
            <div
                className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden"
                style={{
                    boxShadow: `0 0 40px ${getGlowColor()}, inset 0 0 20px ${getGlowColor()}`,
                    border: `4px solid ${getBorderColor()}`,
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                }}
            >
                {/* Goober Logo Image */}
                <Image
                    src="/goober/goober-logo.png"
                    alt="Goober"
                    fill
                    className="object-cover"
                    priority
                />

                {/* State Overlay Emoji */}
                <div className="absolute bottom-2 right-2 text-2xl md:text-3xl bg-bg-primary/80 rounded-full p-1">
                    {getEmoji()}
                </div>
            </div>

            {/* Sanity Indicator */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <div
                    className="bg-bg-secondary px-4 py-1 rounded-full"
                    style={{ border: `2px solid ${getBorderColor()}` }}
                >
                    <span className="font-pixel text-lg">{sanity}%</span>
                </div>
            </div>

            {/* State Label */}
            <div className="text-center mt-6">
                <span
                    className="text-sm uppercase tracking-wider font-bold"
                    style={{ color: getBorderColor() }}
                >
                    {mentalState.replace('_', ' ')}
                </span>
            </div>
        </motion.div>
    );
}

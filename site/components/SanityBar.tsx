'use client';

import { motion } from 'framer-motion';

interface SanityBarProps {
    sanity: number;
}

export default function SanityBar({ sanity }: SanityBarProps) {
    const getSanityClass = () => {
        if (sanity >= 60) return 'sanity-high';
        if (sanity >= 30) return 'sanity-medium';
        return 'sanity-low';
    };

    const getSegments = () => {
        const segments = [];
        for (let i = 0; i < 10; i++) {
            const isActive = sanity > i * 10;
            segments.push(
                <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isActive ? 1 : 0.3 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex-1 h-full rounded ${isActive ? getSanityClass() : 'bg-bg-secondary'}`}
                    style={{ margin: '0 1px' }}
                />
            );
        }
        return segments;
    };

    return (
        <div className="w-full">
            <div className="sanity-bar flex items-center p-1">
                {getSegments()}
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-1 text-xs text-white-muted">
                <span>DEGEN</span>
                <span>NORMAL</span>
                <span>CONFIDENT</span>
            </div>
        </div>
    );
}

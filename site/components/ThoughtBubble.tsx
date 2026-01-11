'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ThoughtBubbleProps {
    thought: string;
}

export default function ThoughtBubble({ thought }: ThoughtBubbleProps) {
    return (
        <div className="thought-bubble">
            <AnimatePresence mode="wait">
                <motion.p
                    key={thought}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl md:text-2xl font-comic text-center"
                >
                    "{thought}"
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { GooberThought } from '@/lib/supabase';

interface ActivityFeedProps {
    thoughts: GooberThought[];
}

export default function ActivityFeed({ thoughts }: ActivityFeedProps) {
    const getTypeEmoji = (type: string) => {
        switch (type) {
            case 'startup': return '🟢';
            case 'analysis': return '🔍';
            case 'buy': return '💰';
            case 'profit': return '🎉';
            case 'loss': return '😢';
            case 'skip': return '👋';
            case 'distribute': return '🎁';
            case 'streak': return '🔥';
            default: return '💭';
        }
    };

    const getStateColor = (state: string) => {
        switch (state) {
            case 'CONFIDENT': return 'border-green-500';
            case 'NORMAL': return 'border-blue-500';
            case 'NERVOUS': return 'border-yellow-500';
            case 'COPIUM': return 'border-orange-500';
            case 'FULL_DEGEN': return 'border-red-500';
            default: return 'border-gray-500';
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="cursed-card p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-goober-orange" />
                <h2 className="text-xl font-bold">Goober's Thoughts</h2>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                <AnimatePresence>
                    {thoughts.map((thought, index) => (
                        <motion.div
                            key={thought.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.02 }}
                            className={`p-3 rounded-lg bg-bg-secondary border-l-4 ${getStateColor(thought.mental_state)}`}
                        >
                            <div className="flex items-start gap-2">
                                <span className="text-lg">{getTypeEmoji(thought.type)}</span>
                                <div className="flex-1">
                                    <p className="text-sm md:text-base">"{thought.thought}"</p>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-white-muted">
                                        <span>{formatTime(thought.created_at)}</span>
                                        <span>•</span>
                                        <span>{thought.mental_state}</span>
                                        <span>•</span>
                                        <span>{thought.sanity}% sanity</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {thoughts.length === 0 && (
                    <div className="text-center text-white-muted py-8">
                        <p>goober is thinking...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

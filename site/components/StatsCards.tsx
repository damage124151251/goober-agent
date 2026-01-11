'use client';

import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, Target, Trophy, Skull } from 'lucide-react';
import { SystemStatus } from '@/lib/supabase';

interface StatsCardsProps {
    status: SystemStatus | null;
}

export default function StatsCards({ status }: StatsCardsProps) {
    const formatSOL = (val: number | null | undefined) => {
        if (val === null || val === undefined) return '0.0000';
        return val.toFixed(4);
    };

    const formatPercent = (val: number | null | undefined) => {
        if (val === null || val === undefined) return '0.00';
        return val.toFixed(2);
    };

    const cards = [
        {
            icon: Wallet,
            label: 'Balance',
            value: `${formatSOL(status?.balance_sol)} SOL`,
            color: 'text-goober-orange'
        },
        {
            icon: status?.total_pnl && status.total_pnl >= 0 ? TrendingUp : TrendingDown,
            label: 'Total PnL',
            value: `${status?.total_pnl && status.total_pnl >= 0 ? '+' : ''}${formatSOL(status?.total_pnl)} SOL`,
            color: status?.total_pnl && status.total_pnl >= 0 ? 'text-green-400' : 'text-red-400'
        },
        {
            icon: status?.today_pnl && status.today_pnl >= 0 ? TrendingUp : TrendingDown,
            label: 'Today PnL',
            value: `${status?.today_pnl && status.today_pnl >= 0 ? '+' : ''}${formatSOL(status?.today_pnl)} SOL`,
            color: status?.today_pnl && status.today_pnl >= 0 ? 'text-green-400' : 'text-red-400'
        },
        {
            icon: Target,
            label: 'Win Rate',
            value: `${formatPercent(status?.win_rate)}%`,
            color: 'text-blue-400'
        },
        {
            icon: Trophy,
            label: 'Wins',
            value: status?.wins || 0,
            subValue: `${status?.win_streak || 0} streak`,
            color: 'text-green-400'
        },
        {
            icon: Skull,
            label: 'Losses',
            value: status?.losses || 0,
            subValue: `${status?.loss_streak || 0} streak`,
            color: 'text-red-400'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cards.map((card, index) => (
                <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="cursed-card p-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                        <span className="text-sm text-white-muted">{card.label}</span>
                    </div>
                    <div className={`text-xl md:text-2xl font-bold font-pixel ${card.color}`}>
                        {card.value}
                    </div>
                    {card.subValue && (
                        <div className="text-xs text-white-muted mt-1">
                            {card.subValue}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

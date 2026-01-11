'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Position } from '@/lib/supabase';

interface PositionsTableProps {
    positions: Position[];
}

export default function PositionsTable({ positions }: PositionsTableProps) {
    const formatSOL = (val: number | null | undefined) => {
        if (val === null || val === undefined) return '0.0000';
        return val.toFixed(4);
    };

    const shortenAddress = (addr: string) => {
        if (!addr) return '';
        return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    };

    return (
        <div className="cursed-card p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-goober-orange" />
                <h2 className="text-xl font-bold">Open Positions</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-white-muted text-sm border-b border-border">
                            <th className="pb-2">Token</th>
                            <th className="pb-2">Size</th>
                            <th className="pb-2">Entry</th>
                            <th className="pb-2">Current</th>
                            <th className="pb-2">PnL</th>
                            <th className="pb-2">SL/TP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((pos, index) => (
                            <motion.tr
                                key={pos.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-border/50"
                            >
                                <td className="py-3">
                                    <span className="font-bold">
                                        {pos.tokens?.simbolo || shortenAddress(pos.token_id)}
                                    </span>
                                </td>
                                <td className="py-3 font-pixel">
                                    {formatSOL(pos.valor_sol)} SOL
                                </td>
                                <td className="py-3 text-sm text-white-muted">
                                    ${pos.entry_price?.toFixed(8)}
                                </td>
                                <td className="py-3 text-sm">
                                    ${pos.current_price?.toFixed(8)}
                                </td>
                                <td className={`py-3 font-pixel ${
                                    pos.pnl_percent >= 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {pos.pnl_percent >= 0 ? '+' : ''}{pos.pnl_percent?.toFixed(2)}%
                                    <div className="text-xs">
                                        ({pos.pnl_sol >= 0 ? '+' : ''}{formatSOL(pos.pnl_sol)} SOL)
                                    </div>
                                </td>
                                <td className="py-3 text-xs">
                                    <span className="text-red-400">{pos.stop_loss}%</span>
                                    {' / '}
                                    <span className="text-green-400">{pos.take_profit}%</span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

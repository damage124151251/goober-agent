'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { History, ExternalLink } from 'lucide-react';
import { Trade } from '@/lib/supabase';

interface TradeHistoryProps {
    trades: Trade[];
}

export default function TradeHistory({ trades }: TradeHistoryProps) {
    const formatSOL = (val: number | null | undefined) => {
        if (val === null || val === undefined) return '0.0000';
        return val.toFixed(4);
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const shortenAddress = (addr: string) => {
        if (!addr) return '';
        return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    };

    return (
        <div className="cursed-card p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-goober-orange" />
                <h2 className="text-xl font-bold">Trade History</h2>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                <AnimatePresence>
                    {trades.map((trade, index) => (
                        <motion.div
                            key={trade.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.02 }}
                            className="p-3 rounded-lg bg-bg-secondary"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                                        trade.tipo === 'buy' ? 'trade-buy' : 'trade-sell'
                                    }`}>
                                        {trade.tipo}
                                    </span>
                                    <span className="font-bold">
                                        {trade.tokens?.simbolo || shortenAddress(trade.token_id)}
                                    </span>
                                </div>
                                <span className="text-xs text-white-muted">
                                    {formatTime(trade.data)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white-muted">
                                    {formatSOL(trade.valor_sol)} SOL
                                </span>
                                {trade.pnl_sol !== null && (
                                    <span className={trade.pnl_sol >= 0 ? 'text-green-400' : 'text-red-400'}>
                                        {trade.pnl_sol >= 0 ? '+' : ''}{formatSOL(trade.pnl_sol)} SOL
                                        {trade.pnl_percent !== null && (
                                            <span className="text-xs ml-1">
                                                ({trade.pnl_percent >= 0 ? '+' : ''}{trade.pnl_percent?.toFixed(1)}%)
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>

                            {trade.goober_reaction && (
                                <div className="mt-2 text-xs text-white-muted italic">
                                    "{trade.goober_reaction}"
                                </div>
                            )}

                            {trade.tx_signature && (
                                <a
                                    href={`https://solscan.io/tx/${trade.tx_signature}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 mt-2 text-xs text-goober-orange hover:underline"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    View TX
                                </a>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {trades.length === 0 && (
                    <div className="text-center text-white-muted py-8">
                        <p>no trades yet...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

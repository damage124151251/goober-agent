'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    supabase,
    getSystemStatus,
    getThoughts,
    getTrades,
    getOpenPositions,
    SystemStatus,
    GooberThought,
    Trade,
    Position
} from '@/lib/supabase';
import GooberAvatar from '@/components/GooberAvatar';
import SanityBar from '@/components/SanityBar';
import ThoughtBubble from '@/components/ThoughtBubble';
import StatsCards from '@/components/StatsCards';
import ActivityFeed from '@/components/ActivityFeed';
import TradeHistory from '@/components/TradeHistory';
import PositionsTable from '@/components/PositionsTable';

export default function Home() {
    const [status, setStatus] = useState<SystemStatus | null>(null);
    const [thoughts, setThoughts] = useState<GooberThought[]>([]);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);
    const [latestThought, setLatestThought] = useState<string>('loading...');

    // Initial load
    useEffect(() => {
        loadData();

        // Set up realtime subscriptions
        const statusChannel = supabase
            .channel('system_status_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'system_status' }, () => {
                loadStatus();
            })
            .subscribe();

        const thoughtsChannel = supabase
            .channel('thoughts_changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'goober_thoughts' }, (payload) => {
                const newThought = payload.new as GooberThought;
                setThoughts(prev => [newThought, ...prev.slice(0, 19)]);
                setLatestThought(newThought.thought);
            })
            .subscribe();

        const tradesChannel = supabase
            .channel('trades_changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'trades' }, () => {
                loadTrades();
            })
            .subscribe();

        const positionsChannel = supabase
            .channel('positions_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'positions' }, () => {
                loadPositions();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(statusChannel);
            supabase.removeChannel(thoughtsChannel);
            supabase.removeChannel(tradesChannel);
            supabase.removeChannel(positionsChannel);
        };
    }, []);

    async function loadData() {
        await Promise.all([loadStatus(), loadThoughts(), loadTrades(), loadPositions()]);
    }

    async function loadStatus() {
        const data = await getSystemStatus();
        setStatus(data);
    }

    async function loadThoughts() {
        const data = await getThoughts();
        setThoughts(data);
        if (data.length > 0) {
            setLatestThought(data[0].thought);
        }
    }

    async function loadTrades() {
        const data = await getTrades();
        setTrades(data);
    }

    async function loadPositions() {
        const data = await getOpenPositions();
        setPositions(data);
    }

    return (
        <main className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
            >
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-goober-orange">
                        GOOBER AGENT
                    </h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        status?.status === 'ONLINE' ? 'status-online' : 'status-offline'
                    }`}>
                        {status?.status || 'LOADING'}
                    </span>
                </div>
                <p className="text-white-muted text-lg">cursed memecoin trading</p>
            </motion.div>

            {/* Goober Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col md:flex-row items-center gap-8 mb-8"
            >
                <GooberAvatar
                    mentalState={status?.mental_state || 'NORMAL'}
                    sanity={status?.sanity || 50}
                />

                <div className="flex-1 w-full">
                    <ThoughtBubble thought={latestThought} />

                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-bold">SANITY</span>
                            <span className="font-pixel text-2xl">{status?.sanity || 50}%</span>
                        </div>
                        <SanityBar sanity={status?.sanity || 50} />
                        <div className="mt-2 text-center">
                            <span className={`text-lg font-bold ${getMentalStateColor(status?.mental_state)}`}>
                                {getMentalStateDisplay(status?.mental_state)}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <StatsCards status={status} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <ActivityFeed thoughts={thoughts} />
                </motion.div>

                {/* Trade History */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <TradeHistory trades={trades} />
                </motion.div>
            </div>

            {/* Open Positions */}
            {positions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8"
                >
                    <PositionsTable positions={positions} />
                </motion.div>
            )}

            {/* Footer */}
            <footer className="mt-12 text-center text-white-muted">
                <p>made by a cursed orange creature</p>
                <div className="flex justify-center gap-4 mt-2">
                    <a href="/privacy" className="hover:text-goober-orange transition">Privacy</a>
                    <span>|</span>
                    <a href="/terms" className="hover:text-goober-orange transition">Terms</a>
                </div>
            </footer>
        </main>
    );
}

function getMentalStateDisplay(state?: string): string {
    switch (state) {
        case 'CONFIDENT': return 'Confident Goober 😎';
        case 'NORMAL': return 'Normal Goober 🙂';
        case 'NERVOUS': return 'Nervous Goober 😰';
        case 'COPIUM': return 'Copium Goober 🥴';
        case 'FULL_DEGEN': return 'Full Degen Goober 💀';
        default: return 'Loading...';
    }
}

function getMentalStateColor(state?: string): string {
    switch (state) {
        case 'CONFIDENT': return 'state-confident';
        case 'NORMAL': return 'state-normal';
        case 'NERVOUS': return 'state-nervous';
        case 'COPIUM': return 'state-copium';
        case 'FULL_DEGEN': return 'state-degen';
        default: return '';
    }
}

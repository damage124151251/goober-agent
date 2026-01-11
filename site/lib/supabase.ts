import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build-time errors
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (supabaseInstance) return supabaseInstance;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a dummy client for SSR/build time
        // This will be replaced with real client on the browser
        console.warn('Supabase credentials not available, using placeholder');
        supabaseInstance = createClient('https://placeholder.supabase.co', 'placeholder');
        return supabaseInstance;
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
}

export const supabase = typeof window !== 'undefined'
    ? getSupabaseClient()
    : createClient('https://placeholder.supabase.co', 'placeholder');

// Re-export for client-side use
export function getSupabase(): SupabaseClient {
    return getSupabaseClient();
}

// Types
export interface SystemStatus {
    id: number;
    status: string;
    wallet_address: string | null;
    balance_sol: number;
    total_pnl: number;
    today_pnl: number;
    total_trades: number;
    wins: number;
    losses: number;
    win_rate: number;
    win_streak: number;
    loss_streak: number;
    sanity: number;
    mental_state: string;
    profit_to_distribute: number;
    updated_at: string;
}

export interface Token {
    id: string;
    ca: string;
    nome: string;
    simbolo: string;
    logo: string | null;
    market_cap: number;
    preco: number;
    holders: number;
    liquidity: number;
    goober_score: number;
    goober_decision: string;
    goober_thought: string;
    goober_confidence: string;
    status: string;
    criado_em: string;
}

export interface Trade {
    id: string;
    token_id: string;
    tipo: string;
    valor_sol: number;
    preco: number;
    pnl_sol: number | null;
    pnl_percent: number | null;
    goober_reaction: string;
    mental_state_at_trade: string;
    sanity_at_trade: number;
    tx_signature: string;
    data: string;
    tokens?: Token;
}

export interface Position {
    id: string;
    token_id: string;
    status: string;
    valor_sol: number;
    entry_price: number;
    current_price: number;
    pnl_percent: number;
    pnl_sol: number;
    stop_loss: number;
    take_profit: number;
    mental_state_at_entry: string;
    aberto_em: string;
    tokens?: Token;
}

export interface GooberThought {
    id: string;
    thought: string;
    type: string;
    related_token: string | null;
    mental_state: string;
    sanity: number;
    created_at: string;
}

// Fetch functions - these will only be called client-side
export async function getSystemStatus(): Promise<SystemStatus | null> {
    const client = getSupabaseClient();
    const { data } = await client
        .from('system_status')
        .select('*')
        .eq('id', 1)
        .single();
    return data;
}

export async function getThoughts(limit = 20): Promise<GooberThought[]> {
    const client = getSupabaseClient();
    const { data } = await client
        .from('goober_thoughts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
    return data || [];
}

export async function getTrades(limit = 20): Promise<Trade[]> {
    const client = getSupabaseClient();
    const { data } = await client
        .from('trades')
        .select('*, tokens(nome, simbolo, logo)')
        .order('data', { ascending: false })
        .limit(limit);
    return data || [];
}

export async function getOpenPositions(): Promise<Position[]> {
    const client = getSupabaseClient();
    const { data } = await client
        .from('positions')
        .select('*, tokens(nome, simbolo, logo)')
        .eq('status', 'open');
    return data || [];
}

export async function getRecentTokens(limit = 10): Promise<Token[]> {
    const client = getSupabaseClient();
    const { data } = await client
        .from('tokens')
        .select('*')
        .order('criado_em', { ascending: false })
        .limit(limit);
    return data || [];
}

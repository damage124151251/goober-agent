-- ═══════════════════════════════════════════════════════════════
-- GOOBER AGENT - REALTIME CONFIGURATION
-- Run this AFTER schema.sql
-- ═══════════════════════════════════════════════════════════════

-- Remove existing (if any)
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.tokens;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.system_status;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.trades;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.positions;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.goober_thoughts;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.distributions;

-- REPLICA IDENTITY (required for UPDATE/DELETE realtime)
ALTER TABLE public.tokens REPLICA IDENTITY FULL;
ALTER TABLE public.system_status REPLICA IDENTITY FULL;
ALTER TABLE public.trades REPLICA IDENTITY FULL;
ALTER TABLE public.positions REPLICA IDENTITY FULL;
ALTER TABLE public.goober_thoughts REPLICA IDENTITY FULL;
ALTER TABLE public.distributions REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.tokens;
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_status;
ALTER PUBLICATION supabase_realtime ADD TABLE public.trades;
ALTER PUBLICATION supabase_realtime ADD TABLE public.positions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.goober_thoughts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.distributions;

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

-- Enable RLS
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goober_thoughts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distributions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "public_read_tokens" ON public.tokens;
DROP POLICY IF EXISTS "public_read_system_status" ON public.system_status;
DROP POLICY IF EXISTS "public_read_trades" ON public.trades;
DROP POLICY IF EXISTS "public_read_positions" ON public.positions;
DROP POLICY IF EXISTS "public_read_goober_thoughts" ON public.goober_thoughts;
DROP POLICY IF EXISTS "public_read_distributions" ON public.distributions;

-- Create read policies (public can read all)
CREATE POLICY "public_read_tokens" ON public.tokens FOR SELECT USING (true);
CREATE POLICY "public_read_system_status" ON public.system_status FOR SELECT USING (true);
CREATE POLICY "public_read_trades" ON public.trades FOR SELECT USING (true);
CREATE POLICY "public_read_positions" ON public.positions FOR SELECT USING (true);
CREATE POLICY "public_read_goober_thoughts" ON public.goober_thoughts FOR SELECT USING (true);
CREATE POLICY "public_read_distributions" ON public.distributions FOR SELECT USING (true);

-- Service role can do everything (for the bot)
DROP POLICY IF EXISTS "service_all_tokens" ON public.tokens;
DROP POLICY IF EXISTS "service_all_system_status" ON public.system_status;
DROP POLICY IF EXISTS "service_all_trades" ON public.trades;
DROP POLICY IF EXISTS "service_all_positions" ON public.positions;
DROP POLICY IF EXISTS "service_all_goober_thoughts" ON public.goober_thoughts;
DROP POLICY IF EXISTS "service_all_distributions" ON public.distributions;

CREATE POLICY "service_all_tokens" ON public.tokens FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_system_status" ON public.system_status FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_trades" ON public.trades FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_positions" ON public.positions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_goober_thoughts" ON public.goober_thoughts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_all_distributions" ON public.distributions FOR ALL USING (auth.role() = 'service_role');

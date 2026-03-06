import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Bot } from '@/lib/supabase';

export function useBots() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBots = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('bots')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (err) throw err;
      setBots(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching bots:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBot = useCallback(async (userId: string, botData: Omit<Bot, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('bots')
        .insert([{ ...botData, user_id: userId }])
        .select()
        .single();

      if (err) throw err;
      setBots(prev => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err.message);
      console.error('Error creating bot:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBot = useCallback(async (botId: string, updates: Partial<Bot>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('bots')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', botId)
        .select()
        .single();

      if (err) throw err;
      setBots(prev => prev.map(b => b.id === botId ? data : b));
      return data;
    } catch (err: any) {
      setError(err.message);
      console.error('Error updating bot:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBot = useCallback(async (botId: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error: err } = await supabase
        .from('bots')
        .delete()
        .eq('id', botId);

      if (err) throw err;
      setBots(prev => prev.filter(b => b.id !== botId));
    } catch (err: any) {
      setError(err.message);
      console.error('Error deleting bot:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { bots, loading, error, fetchBots, createBot, updateBot, deleteBot };
}

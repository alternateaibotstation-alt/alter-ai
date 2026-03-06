import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface DashboardStats {
  active_bots: number;
  messages_this_week: number;
  total_users: number;
  avg_rating: number;
}

export interface RecentBot {
  id: string;
  name: string;
  status: 'active' | 'paused';
  messages_count: number;
  model: string;
}

export function useDashboardData(userId?: string) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bots, setBots] = useState<RecentBot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch bots
        const { data: botsData, error: botsError } = await supabase
          .from('bots')
          .select('id, name, status, messages_count, model')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);

        if (botsError) throw botsError;

        // Fetch messages this week
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const { data: messagesData, error: messagesError } = await supabase
          .from('bot_messages')
          .select('id')
          .eq('user_id', userId)
          .gte('created_at', weekAgo.toISOString());

        if (messagesError) throw messagesError;

        // Calculate stats
        const stats: DashboardStats = {
          active_bots: botsData?.filter((b: any) => b.status === 'active').length || 0,
          messages_this_week: messagesData?.length || 0,
          total_users: botsData?.length || 0, // Placeholder
          avg_rating: 4.8, // Placeholder
        };

        setBots(botsData || []);
        setStats(stats);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { stats, bots, loading, error };
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Bot {
  id: string;
  user_id: string;
  name: string;
  description: string;
  model: string;
  persona: string;
  is_public: boolean;
  status: 'active' | 'paused';
  messages_count: number;
  created_at: string;
  updated_at: string;
}

export interface BotMessage {
  id: string;
  bot_id: string;
  user_id: string;
  content: string;
  response: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  bots_count: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}

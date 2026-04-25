import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using a dummy client.');
}

const createSafeSupabaseClient = () => {
  try {
    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.startsWith('%') && !supabaseAnonKey.startsWith('%')) {
      return createClient(supabaseUrl, supabaseAnonKey);
    }
  } catch (e) {
    console.error('Failed to initialize Supabase:', e);
  }
  
  // Return a safe dummy client that won't crash the app
  return { 
    from: () => ({ 
      select: () => ({ 
        eq: () => ({ 
          order: () => ({ 
            range: () => Promise.resolve({ data: [], error: null }),
            single: () => Promise.resolve({ data: null, error: null })
          }),
          single: () => Promise.resolve({ data: null, error: null })
        }),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    }) 
  } as any;
};

export const supabase = createSafeSupabaseClient();

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

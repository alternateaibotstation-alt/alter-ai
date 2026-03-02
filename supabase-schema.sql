-- ALTER AI Database Schema for Supabase
-- Run this SQL in your Supabase dashboard

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free',
  bots_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bots table
CREATE TABLE IF NOT EXISTS bots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  model TEXT DEFAULT 'GPT-4o',
  persona TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active',
  messages_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bot Messages table
CREATE TABLE IF NOT EXISTS bot_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMP DEFAULT NOW(),
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bot Templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  model TEXT DEFAULT 'GPT-4o',
  persona TEXT,
  rating DECIMAL(3,1) DEFAULT 0,
  installs INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bot Logic Nodes table
CREATE TABLE IF NOT EXISTS bot_logic_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  node_type TEXT NOT NULL,
  label TEXT NOT NULL,
  value TEXT,
  position_x INTEGER,
  position_y INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bot Logic Connections table
CREATE TABLE IF NOT EXISTS bot_logic_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  from_node_id UUID NOT NULL REFERENCES bot_logic_nodes(id) ON DELETE CASCADE,
  to_node_id UUID NOT NULL REFERENCES bot_logic_nodes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Revenue Analytics table
CREATE TABLE IF NOT EXISTS revenue_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE,
  mrr DECIMAL(10,2) DEFAULT 0,
  churn_rate DECIMAL(5,2) DEFAULT 0,
  ltv DECIMAL(10,2) DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Affiliate Referrals table
CREATE TABLE IF NOT EXISTS affiliate_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  commission_rate DECIMAL(5,2) DEFAULT 30,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bots_user_id ON bots(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_messages_bot_id ON bot_messages(bot_id);
CREATE INDEX IF NOT EXISTS idx_bot_messages_user_id ON bot_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_logic_nodes_bot_id ON bot_logic_nodes(bot_id);
CREATE INDEX IF NOT EXISTS idx_revenue_analytics_user_id ON revenue_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_referrer_id ON affiliate_referrals(referrer_id);

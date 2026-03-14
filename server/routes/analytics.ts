import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables in analytics route.');
}

const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : { from: () => ({ select: () => ({ eq: () => ({ order: () => ({ range: () => Promise.resolve({ data: [], error: null }) }) }) }) }) } as any;

// GET user dashboard stats
router.get('/user/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get bot count
    const { data: bots } = await supabase
      .from('bots')
      .select('id')
      .eq('user_id', userId);

    // Get total messages this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const { data: messages } = await supabase
      .from('bot_messages')
      .select('id')
      .eq('user_id', userId)
      .gte('created_at', weekAgo.toISOString());

    // Get unique users who interacted with bots
    const { data: uniqueUsers } = await supabase
      .from('bot_messages')
      .select('user_id')
      .in('bot_id', bots?.map((b: any) => b.id) || []);

    const uniqueUserIds = new Set(uniqueUsers?.map((u: any) => u.user_id) || []);

    res.json({
      active_bots: bots?.length || 0,
      messages_this_week: messages?.length || 0,
      total_users: uniqueUserIds.size || 0,
      avg_rating: 4.8,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET revenue analytics
router.get('/user/:userId/revenue', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('revenue_analytics')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(30);

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST revenue analytics
router.post('/user/:userId/revenue', async (req, res) => {
  try {
    const { userId } = req.params;
    const { bot_id, mrr, churn_rate, ltv } = req.body;

    const { data, error } = await supabase
      .from('revenue_analytics')
      .insert([
        {
          user_id: userId,
          bot_id,
          mrr,
          churn_rate,
          ltv,
          date: new Date().toISOString().split('T')[0],
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET affiliate referrals
router.get('/user/:userId/referrals', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('affiliate_referrals')
      .select('*')
      .eq('referrer_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST affiliate referral
router.post('/user/:userId/referrals', async (req, res) => {
  try {
    const { userId } = req.params;
    const { referred_email } = req.body;

    // Get referred user
    const { data: referredUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', referred_email)
      .single();

    if (userError || !referredUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { data, error } = await supabase
      .from('affiliate_referrals')
      .insert([
        {
          referrer_id: userId,
          referred_id: referredUser.id,
          commission_rate: 30,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

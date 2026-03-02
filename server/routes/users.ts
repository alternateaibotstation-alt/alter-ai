import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET user profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE user
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          name: name || email.split('@')[0],
          plan: 'free',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Create default subscription
    await supabase.from('subscriptions').insert([
      {
        user_id: data.id,
        plan: 'free',
        status: 'active',
      },
    ]);

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE user profile
router.patch('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET user subscription
router.get('/:userId/subscription', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE subscription
router.patch('/:userId/subscription', async (req, res) => {
  try {
    const { userId } = req.params;
    const { plan, status } = req.body;

    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        plan,
        status,
        updated_at: new Date(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    // Update user plan
    await supabase
      .from('users')
      .update({ plan })
      .eq('id', userId);

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

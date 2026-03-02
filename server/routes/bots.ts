import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET all bots for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('bots')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET single bot
router.get('/:botId', async (req, res) => {
  try {
    const { botId } = req.params;
    const { data, error } = await supabase
      .from('bots')
      .select('*')
      .eq('id', botId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new bot
router.post('/', async (req, res) => {
  try {
    const { user_id, name, description, model, persona, is_public } = req.body;

    if (!user_id || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('bots')
      .insert([
        {
          user_id,
          name,
          description,
          model: model || 'GPT-4o',
          persona,
          is_public: is_public || false,
          status: 'active',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Update user's bot count
    await supabase.rpc('increment_bot_count', { user_id });

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE bot
router.patch('/:botId', async (req, res) => {
  try {
    const { botId } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('bots')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', botId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE bot
router.delete('/:botId', async (req, res) => {
  try {
    const { botId } = req.params;

    // Get bot to find user_id
    const { data: bot, error: fetchError } = await supabase
      .from('bots')
      .select('user_id')
      .eq('id', botId)
      .single();

    if (fetchError) throw fetchError;

    // Delete bot
    const { error: deleteError } = await supabase
      .from('bots')
      .delete()
      .eq('id', botId);

    if (deleteError) throw deleteError;

    // Decrement user's bot count
    await supabase.rpc('decrement_bot_count', { user_id: bot.user_id });

    res.json({ success: true, message: 'Bot deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET bot messages
router.get('/:botId/messages', async (req, res) => {
  try {
    const { botId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const { data, error } = await supabase
      .from('bot_messages')
      .select('*')
      .eq('bot_id', botId)
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST bot message
router.post('/:botId/messages', async (req, res) => {
  try {
    const { botId } = req.params;
    const { user_id, content, response } = req.body;

    const { data, error } = await supabase
      .from('bot_messages')
      .insert([
        {
          bot_id: botId,
          user_id,
          content,
          response,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Increment bot message count
    await supabase
      .from('bots')
      .update({ messages_count: supabase.rpc('increment', { x: 1 }) })
      .eq('id', botId);

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

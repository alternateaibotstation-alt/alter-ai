import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables in bots route.');
}

const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : { from: () => ({ select: () => ({ eq: () => ({ order: () => ({ range: () => Promise.resolve({ data: [], error: null }) }) }) }) }) } as any;

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
    const { data: user } = await supabase.from('users').select('bots_count').eq('id', user_id).single();
    await supabase.from('users').update({ bots_count: (user?.bots_count || 0) + 1 }).eq('id', user_id);

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
    const { data: user } = await supabase.from('users').select('bots_count').eq('id', bot.user_id).single();
    await supabase.from('users').update({ bots_count: Math.max(0, (user?.bots_count || 0) - 1) }).eq('id', bot.user_id);

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
    const { user_id, content } = req.body;

    // Get bot persona
    const { data: bot, error: botError } = await supabase
      .from('bots')
      .select('persona, model')
      .eq('id', botId)
      .single();

    if (botError) throw botError;

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: bot.model || 'gpt-4o',
      messages: [
        { role: 'system', content: bot.persona || 'You are a helpful assistant.' },
        { role: 'user', content: content }
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    const { data, error } = await supabase
      .from('bot_messages')
      .insert([
        {
          bot_id: botId,
          user_id,
          content,
          response: aiResponse,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Increment bot message count
    await supabase.from('bots').update({ 
      messages_count: (bot.messages_count || 0) + 1 
    }).eq('id', botId);

    res.status(201).json(data);
  } catch (error: any) {
    console.error('AI Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

import { Router } from 'express';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24-preview' as any,
});

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ error: 'Missing userId or planId' });
    }

    // Map planId to Stripe Price ID (You should create these in your Stripe Dashboard)
    // For now, we'll use a placeholder or create a dynamic one if allowed
    const priceMap: Record<string, string> = {
      'pro': 'price_pro_placeholder', // Replace with your actual Stripe Price ID
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planId === 'pro' ? 'Pro Plan' : 'Enterprise Plan',
            },
            unit_amount: planId === 'pro' ? 4900 : 0, // $49.00
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/subscription?success=true`,
      cancel_url: `${req.headers.origin}/subscription?canceled=true`,
      client_reference_id: userId,
      metadata: {
        userId,
        planId,
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;

    if (userId && planId) {
      // Update user subscription in Supabase
      await supabase
        .from('subscriptions')
        .update({
          plan: planId,
          status: 'active',
          updated_at: new Date(),
        })
        .eq('user_id', userId);

      await supabase
        .from('users')
        .update({ plan: planId })
        .eq('id', userId);
    }
  }

  res.json({ received: true });
});

export default router;

const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_your_stripe_secret_key_here');

// Stripe donation endpoint
router.post('/stripe', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Donation to Price Foundation',
          },
          unit_amount: req.body.amount * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/donate?success=true',
      cancel_url: 'http://localhost:3000/donate?cancel=true',
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

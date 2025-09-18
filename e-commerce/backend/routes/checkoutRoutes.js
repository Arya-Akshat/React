const express = require('express');
const Stripe = require('stripe');
const { authMiddleware } = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-session', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const line_items = cart.items.map(item => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productId.name,
                        images: [item.productId.imageUrl],
                    },
                    unit_amount: item.productId.price * 100, // Price in cents
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        // Optional: Clear cart after creating session
        // cart.items = [];
        // await cart.save();

        res.json({ id: session.id });
    } catch (error) {
        console.error('Stripe session creation error:', error);
        res.status(500).json({ message: 'Server error while creating checkout session' });
    }
});

module.exports = router;
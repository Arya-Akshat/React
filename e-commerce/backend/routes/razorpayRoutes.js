const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { authMiddleware } = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    const options = {
      amount: totalPrice * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ message: 'Server error while creating Razorpay order' });
  }
});

// Verify payment
router.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');

  if (digest === razorpay_signature) {
    // Payment is successful
    // Here you can save the payment details to your database
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure' });
  }
});

module.exports = router;

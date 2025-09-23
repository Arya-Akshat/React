const express = require('express');
const Cart = require('../models/Cart');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// GET user's cart (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST add item to cart (protected)
router.post('/add', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(p => p.productId == productId);
    if (itemIndex > -1) {
      // Update quantity
      let productItem = cart.items[itemIndex];
      productItem.quantity += quantity;
      cart.items[itemIndex] = productItem;
    } else {
      // Add new item
      cart.items.push({ productId, quantity });
    }

    cart = await cart.save();
    // Populate before sending back
    await cart.populate('items.productId');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE item from cart (protected)
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Check if product in cart
    const itemIndex = cart.items.findIndex(p => p.productId == productId);
    if (itemIndex > -1) {
      // Remove item
      cart.items.splice(itemIndex, 1);
      cart = await cart.save();
      // Populate before sending back
      await cart.populate('items.productId');
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
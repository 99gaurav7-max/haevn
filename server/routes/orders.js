const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

let orders = [];

router.post('/', authenticateToken, (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, total } = req.body;

    if (!items || !shippingAddress || !paymentMethod || !total) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    const order = {
      id: uuidv4(),
      userId: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    orders.push(order);

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', authenticateToken, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json({ orders: userOrders });
});

router.get('/:id', authenticateToken, (req, res) => {
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json({ order });
});

module.exports = router;

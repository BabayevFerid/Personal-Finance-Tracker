const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// Create a transaction
router.post('/', async (req, res) => {
  const { title, amount, type } = req.body;
  const transaction = new Transaction({ title, amount, type });
  await transaction.save();
  res.json(transaction);
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;

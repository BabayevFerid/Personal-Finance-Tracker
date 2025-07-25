const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionsRoute = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/finance-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/transactions', transactionsRoute);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

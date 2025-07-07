import React, { useEffect, useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  useEffect(() => {
    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  const addTransaction = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount: Number(amount), type }),
    });
    const data = await res.json();
    setTransactions([data, ...transactions]);
    setTitle('');
    setAmount('');
  };

  const deleteTransaction = async (id) => {
    await fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: 'DELETE',
    });
    setTransactions(transactions.filter(t => t._id !== id));
  };

  return (
    <div style={{ width: 400, margin: '0 auto' }}>
      <h2>Personal Finance Tracker</h2>
      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          required
          onChange={e => setAmount(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <ul>
        {transactions.map(t => (
          <li key={t._id}>
            {t.title} - {t.amount} AZN ({t.type})
            <button onClick={() => deleteTransaction(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>
        Balance:{" "}
        {transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0)} AZN
      </h3>
    </div>
  );
}

export default App;

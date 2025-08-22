
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

let orders = [];
app.post('/api/orders', (req, res) => {
  const order = { id: orders.length + 1, ...req.body };
  orders.push(order);
  res.json(order);
});
app.get('/api/orders', (_req, res) => res.json(orders));

app.use(express.static(path.join(__dirname, '../frontend')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

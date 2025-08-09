const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend'));

let services = [
  { id: 's1', title: 'Repair Refrigerator' },
  { id: 's2', title: 'Fix Laptop' },
  { id: 's3', title: 'Plumbing' },
];

let orders = [];
let tasks = [];
let contacts = [];

app.get('/api/services', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const result = services.filter(s => s.title.toLowerCase().includes(q));
  res.json(result);
});

app.post('/api/orders', (req, res) => {
  const { serviceId, contact, description } = req.body;
  const newOrder = {
    id: uuidv4(),
    serviceId,
    contact,
    description: description || '',
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  res.json(newOrder);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders/:id/accept', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = 'accepted';
  res.json(order);
});

app.post('/api/orders/:id/complete', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = 'completed';
  res.json(order);
});

app.post('/api/orders/:id/rate', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const { rating, feedback } = req.body;
  order.rating = rating;
  order.feedback = feedback;
  order.status = 'rated';
  res.json(order);
});

app.post('/api/crm/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  const newContact = { id: uuidv4(), name, phone: phone || '', email: email || '' };
  contacts.push(newContact);
  res.json(newContact);
});
app.get('/api/crm/contacts', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const result = contacts.filter(c => c.name.toLowerCase().includes(q));
  res.json(result);
});

app.post('/api/crm/tasks', (req, res) => {
  const { title, dueAt } = req.body;
  const newTask = { id: uuidv4(), title, dueAt, status: 'open' };
  tasks.push(newTask);
  res.json(newTask);
});
app.get('/api/crm/tasks', (req, res) => {
  res.json(tasks);
});
app.post('/api/crm/tasks/:id/close', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.status = 'closed';
  res.json(task);
});

app.get('/api/analytics', (req, res) => {
  const totalOrders = orders.length;
  const statuses = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  res.json({ totalOrders, statuses });
});

app.get('/api/hello', (req, res) => {
  res.json({ ok: true, message: 'Hello from PROFI24 API' });
});

app.listen(port, () => {
  console.log(`PROFI24 server listening on port ${port}`);
});

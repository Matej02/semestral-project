const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = './data.json';

app.use(express.json());
app.use(express.static(__dirname));

function loadData() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/items', (req, res) => {
  res.json(loadData());
});

app.get('/api/items/:id', (req, res) => {
  const data = loadData();
  const item = data.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const data = loadData();
  const newItem = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description || '',
    done: false,
    createdAt: new Date().toISOString()
  };
  data.push(newItem);
  saveData(data);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const data = loadData();
  const index = data.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  data[index] = { ...data[index], ...req.body };
  saveData(data);
  res.json(data[index]);
});

app.delete('/api/items/:id', (req, res) => {
  let data = loadData();
  const index = data.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  data.splice(index, 1);
  saveData(data);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
  console.log(`Server bezi na http://localhost:${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = Number(process.env.PORT || 3001);
const mongoUrl = process.env.MONGO_URI;

app.get('/', async (_req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: 'success', message: 'API and MongoDB are connected!', database: mongoose.connection.name });
  } catch (error) {
    res.status(503).json({ status: 'error', message: 'Database connection failed' });
  }
});

app.get('/health', async (_req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: 'healthy' });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy' });
  }
});

async function start() {
  if (!mongoUrl) throw new Error('MONGO_URI is required');
  await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 10000 });
  console.log('Connected to MongoDB');
  app.listen(port, '0.0.0.0', () => console.log(`API listening on port ${port}`));
}

start().catch(err => { console.error(err); process.exit(1); });
process.on('SIGTERM', async () => { await mongoose.disconnect(); process.exit(0); });

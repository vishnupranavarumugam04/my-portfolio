const express = require('express');
const cors = require('cors');
const path = require('path');
const siteRoutes = require('./routes/site');
const githubRoutes = require('./routes/github');
const uploadRoutes = require('./routes/upload');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/site', siteRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

module.exports = app;

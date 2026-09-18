const dotenv = require('dotenv');
const path = require('path');

// Ensure env variables are read
dotenv.config();

const app = require('../server/src/app');
const { connectDB } = require('../server/src/config/db');

// Connect to database in serverless lifecycle (cached connection across invocations)
let dbPromise = null;

const handler = async (req, res) => {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  await dbPromise;
  return app(req, res);
};

module.exports = handler;

const dotenv = require('dotenv');
dotenv.config();

const app = require('../server/src/app');
const { connectDB } = require('../server/src/config/db');

// Connect to database in serverless lifecycle (cached connection across invocations)
let dbPromise = null;

const handler = async (req, res) => {
  try {
    if (!dbPromise) {
      dbPromise = connectDB().catch((err) => {
        console.warn('⚠️ [Serverless] Database connection warning:', err.message);
        return null;
      });
    }
    await dbPromise;
  } catch (err) {
    console.warn('⚠️ [Serverless] DB promise catch:', err.message);
  }

  return app(req, res);
};

module.exports = handler;


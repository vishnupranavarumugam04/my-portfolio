const dotenv = require('dotenv');
dotenv.config();

const app = require('../server/src/app');
const { connectDB } = require('../server/src/config/db');

let isConnecting = false;

const handler = async (req, res) => {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    }
  } catch (err) {
    console.warn('⚠️ [Serverless] DB connect warning:', err.message);
  }

  return app(req, res);
};

module.exports = handler;


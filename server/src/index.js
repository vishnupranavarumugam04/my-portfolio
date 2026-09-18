const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from root .env or server/.env
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 7001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀 [Server] Backend API running at http://localhost:${PORT}`);
      console.log(`📡 [Endpoints] GET  /api/site`);
      console.log(`📡 [Endpoints] PUT  /api/site`);
      console.log(`📡 [Endpoints] GET  /api/github/:username/repos`);
      console.log(`📡 [Endpoints] POST /api/upload\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

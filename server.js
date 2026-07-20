import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/orders', orderRoutes);

// Connect to MongoDB Atlas
if (!MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined in environment variables (.env)");
  process.exit(1);
}

console.log("Connecting to MongoDB Atlas...");
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB Atlas cluster.");
    
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Backend server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("FATAL ERROR: Could not connect to MongoDB cluster:", error.message);
    process.exit(1);
  });

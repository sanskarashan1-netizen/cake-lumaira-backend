import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import orderRoutes from './routes/orderRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import cakeRoutes from './routes/cakeRoutes.js';

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
app.use('/hero-slides', heroRoutes);
app.use('/cakes', cakeRoutes);

// Root Route (Health Check)
app.get('/', (req, res) => {
  res.json({ 
    status: "online", 
    message: "Lumaira Premium Cake Shop Backend API is running successfully." 
  });
});

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

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from './routes/user.route.js';
import gigRoute from './routes/gig.route.js';
import reviewRoute from './routes/review.route.js';
import orderRoute from './routes/order.route.js';
import conversationRoute from './routes/conversation.route.js';
import messageRoute from './routes/message.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();

const app = express();

//  Root route (should come after `app` is defined)
app.get("/", (req, res) => {
  res.send("Worksphere Clone Backend is Running 🚀");
});

// Connect to MongoDB
mongoose.set('strictQuery', true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); 
    console.log(' MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);

// Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connect();
  console.log(` Server running on port ${PORT}`);
});

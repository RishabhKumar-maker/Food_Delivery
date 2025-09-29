import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

// ---- Rate limiters ----

// Very strict: prevent brute force login/register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login/register attempts. Try again after 15 minutes.',
});

// Medium: prevent spamming order creation
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 orders per 15 minutes
  message: 'Too many orders from this IP. Try again later.',
});

// Relaxed: cart updates can be frequent, but still limited
const cartLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // 50 cart updates per 15 minutes
  message: 'Too many cart actions. Slow down a bit.',
});

app.use(cors());
app.use(express.json());
app.use('/images', express.static('uploads')); // static files

// Default route
app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

connectDB();

// ---- Apply routes with selective rate limiting ----

// Food routes (no strict limiter for GET menu)
app.use('/api/food', foodRouter);

// User routes (apply limiter only to login/register inside userRouter)
app.use('/api/user/login', authLimiter);
app.use('/api/user/register', authLimiter);
app.use('/api/user', userRouter);

// Cart routes
app.use('/api/cart', cartLimiter, cartRouter);

// Order routes
app.use('/api/order', orderLimiter, orderRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

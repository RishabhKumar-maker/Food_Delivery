import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT;

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again after 15 minutes',
  statusCode: 429, // Optional: default is 429
  headers: true, // Send X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After headers
});

app.use(cors());
// app.use(apiLimiter); // Apply rate limiting to all requests
app.use(express.json());
app.use('/images', express.static('uploads')); // Serve static files from the 'uploads' directory


app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

connectDB();
app.use('/api/user/login', apiLimiter);
app.use('/api/user/register', apiLimiter);
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

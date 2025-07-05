import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('uploads')); // Serve static files from the 'uploads' directory


app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

connectDB();

app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

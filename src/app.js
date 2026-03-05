import express from 'express';
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/user.routes.js'
import shopRouter from './routes/shop.routes.js'
import productRouter from './routes/product.routes.js'
import medicineRouter from './routes/medicine.routes.js'
import statsRouter from './routes/stats.routes.js'

export const app = express()

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://pharmacy-iota.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Blocked origin:', origin);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/user', userRoutes)

app.use('/api/shop', shopRouter)

app.use('/api/shop', productRouter)

app.use('/api', medicineRouter)

app.use('/api/shop', statsRouter)

app.use(errorHandler)

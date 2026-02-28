import express from 'express';
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/user.routes.js'
import shopRouter from './routes/shop.routes.js'
import productRouter from './routes/product.routes.js'
import medicineRouter from './routes/medicine.routes.js'
import statsRouter from './routes/stats.routes.js'

export const app = express()

app.use(cors({
  origin: true,
  credentials: true
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

app.use('/api', statsRouter)

app.use(errorHandler)

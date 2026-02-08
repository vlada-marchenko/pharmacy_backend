import express from 'express';
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/user.routes.js'
import shopRouter from './routes/shop.routes.js'
import productRouter from './routes/product.routes.js'
import medicineRouter from './routes/medicine.routes.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/user', userRoutes)

app.use('/api/shop', shopRouter)

app.use('/api/shop', productRouter)

app.use('/api', medicineRouter)

app.use(errorHandler)
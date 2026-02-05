import express from 'express';
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/user', userRoutes)

app.use('/api/products', productRoutes)

app.use(errorHandler)
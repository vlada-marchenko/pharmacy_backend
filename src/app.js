import express from 'express';
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/user.routes'


export const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/user', userRoutes)

app.use(errorHandler)
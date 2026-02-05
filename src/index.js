/* eslint-disable no-undef */
import 'dotenv/config'
import mongoose from 'mongoose'
import { app } from './app.js'

const PORT = process.env.PORT || 3000

async function start() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("CONNECTED DB:", mongoose.connection.name);
console.log("CONNECTED HOST:", mongoose.connection.host);
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
}

start().catch(err => {
    console.error(err)
    process.exit(1)
})
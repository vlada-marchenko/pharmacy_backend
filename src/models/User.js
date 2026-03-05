
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
},
    { timestamps: true }
)

export default mongoose.model('User', userSchema)

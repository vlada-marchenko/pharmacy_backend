
import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true },
    photo: { type: String, required: true },
    name: { type: String, required: true, trim: true, index: true },
    suppliers: { type: String, trim: true },
    stock: { type: Number, required: true, min: 0},
    price: { type: Number, required: true, min: 0 },
    category: { type: String, trim: true, index: true}
},
{ timestamps: true })

medicineSchema.index({ name: 1, category: 1 }, { unique: true })

export default mongoose.model('Medicine', medicineSchema)
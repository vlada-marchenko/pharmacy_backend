
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true, index: true },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true, index: true },

    stock: { type: Number, default: 0, min: 0},
    price: { type: Number, required: true, min: 0 },
    photo: { type: String, required: true },
    name: { type: String, required: true, trim: true, index: true },
    category: { type: String, trim: true, index: true}
}, { timestamps: true })

productSchema.index({ shopId: 1, medicineId: 1 }, { unique: true })

export default mongoose.model('Product', productSchema)
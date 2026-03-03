import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: false, index: true },
    name: { type: String, required: true },
    amount: { type: String, required: true },
    type: { type: String, enum: ['Income', 'Expense', 'Error'], required: true }
}, { timestamps: true })

export default mongoose.model('Transaction', transactionSchema)


import mongoose from "mongoose";

const boughtProductsSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        category: { type: String }
    },
    { _id: false }
)

const customersSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    spent: { type: String, required: true },
    bought_products: {  type: [boughtProductsSchema], default: []}
}, { timestamps: true })

export default mongoose.model('Customers', customersSchema)


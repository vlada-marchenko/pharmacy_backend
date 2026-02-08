
import mongoose from "mongoose";

const medicinalPropertiesSchema = new mongoose.Schema({
    anti_inflammatory: { type: String },
    symptom_relief: { type: String },
    supportive_care: { type: String },
    preventive_benefits: { type: String },
    safety_note: { type: String }
}, {
    _id: false
})

const descriptionSchema = new mongoose.Schema({
    overview: { type: String },
    medicinal_properties: { type: medicinalPropertiesSchema, default: {} }
}, { _id: false})

const reviewSchema = new mongoose.Schema({
    author: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    date: { type: String }
}, { _id: false })

const medicineSchema = new mongoose.Schema({
    id: { type: String, unique: true, index: true },
    photo: { type: String, required: true },
    name: { type: String, required: true, trim: true, index: true },
    price: { type: String, required: true, min: 0 },
    category: { type: String, trim: true, index: true},
    description: { type: descriptionSchema, default: {} },
    reviews: { type: [reviewSchema], default: [] }
},
{ timestamps: true })

medicineSchema.index({ name: 1, category: 1 }, { unique: true })

export default mongoose.model('Medicine', medicineSchema)
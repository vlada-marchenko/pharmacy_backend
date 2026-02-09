import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    shopName: { type: String, required: true, trim: true },
    shopOwnerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },

    phoneNumber: { type: String, default: '', trim: true },
    streetAddress: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    zipPostal: { type: String, default: '', trim: true },

    hasDeliverySystem: { type: Boolean, default: false}
},
{ timestamps: true }
)

shopSchema.index({ ownerId: 1, shopName: 1 }, { unique: true })

export default mongoose.model("Shop", shopSchema)
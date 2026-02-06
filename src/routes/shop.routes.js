import express from 'express'
import mongoose from 'mongoose'
import Shop from '../models/Shop.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()
 

router.post('/create', auth, async (req, res) => {
    try {

        const ownerId = req.user?.id || req.user?.userId || req.user?._id
        if (!ownerId) return res.status(401).json({ message: 'Unauthorized' })

        const {
            shopName,
            shopOwnerName,
            email,
            phoneNumber = '',
            streetAddress = '',
            city = '',
            zipPostal = '',
            hasDeliverySystem = false
        } = req.body

        if(!shopName || !shopOwnerName || !email) {
            return res.status(400).json({ message: 'Shop name, owner name and email are required' })
        }

        const shop = await Shop.create({
            ownerId,
            shopName,
            shopOwnerName,
            email,
            phoneNumber,
            streetAddress,
            city,
            zipPostal,
            hasDeliverySystem: Boolean(hasDeliverySystem)
        })

        return res.status(201).json(shop)
    } catch (err) {
        if (err?.code === 11000) {
            return res.status(409).json({ message: 'Shop with this name already exists for this user' })
        }
        return res.status(500).json({ message: err.message || 'Server error' })
    }
})

router.get('/:shopId', auth, async (req, res) => {
    const { shopId } = req.params
    if (!mongoose.isValidObjectId(shopId)) return res.status(400).json({ message: 'Invalid shopId' })


        const ownerId = req.user?.id || req.user?.userId || req.user?._id
        if (!ownerId) return res.status(401).json({ message: 'Unauthorized' })
    
    const shop = await Shop.findOne({ _id: shopId, ownerId}).lean()
    if (!shop) return res.status(404).json({ message: 'Shop not found' })

    res.json(shop)
})

router.put('/:shopId/update', auth, async (req, res) => {
    const { shopId } = req.params
    if (!mongoose.isValidObjectId(shopId)) return res.status(400).json({ message: 'Invalid shopId' })


        const ownerId = req.user?.id || req.user?.userId || req.user?._id
        if (!ownerId) return res.status(401).json({ message: 'Unauthorized' })

    const allowed = [
        'shopName',
        'shopOwnerName',
        'email',
        'phoneNumber',
        'streetAddress',
        'city',
        'zipPostal',
        'hasDeliverySystem'
    ]

    const update = {}
    for (const key of allowed) if (key in req.body) update[key] = req.body[key]

    if('hasDeliverySystem' in update) update.hasDeliverySystem = Boolean(update.hasDeliverySystem)

    const shop = await Shop.findOneAndUpdate({ _id: shopId, ownerId },
        update,
        { new: true }
    ).lean()

    if(!shop) return res.status(404).json({ message: 'Shop not found' })
        res.json(shop)
})

export default router
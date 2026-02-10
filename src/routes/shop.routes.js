import { Router } from 'express'
import { auth } from '../middlewares/auth.js'
import { createShop, getShopById, updateShop } from '../controllers/shop.controller.js'

const router = Router()

router.post('/create', auth, createShop)

router.get('/:shopId', auth, getShopById)

router.put('/:shopId/update', auth, updateShop)

export default router
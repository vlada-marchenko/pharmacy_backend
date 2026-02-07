import { Router } from 'express'
import auth from '../middlewares/auth.js'
import { addProduct, deleteProduct, editProduct, getProductById, listProducts } from '../controllers/product.controller.js'

const router = Router()

router.get('/api/shop/:shopId/product', auth, listProducts)
router.post('/api/shop/:shopId/product/add', auth, addProduct)
router.get('/api/shop/:shopId/product/:productId', auth, getProductById)
router.put('/api/shop/:shopId/product/:productId/edit', auth, editProduct)
router.delete('/api/shop/:shopId/product/:productId/delete', auth, deleteProduct)
import { Router } from 'express'
import { auth } from '../middlewares/auth.js'
import { addProduct, deleteProduct, editProduct, getProductById, listProducts } from '../controllers/product.controller.js'

const router = Router()

router.get('/:shopId/product', auth, listProducts)
router.post('/:shopId/product/add', auth, addProduct)
router.get('/:shopId/product/:productId', auth, getProductById)
router.put('/:shopId/product/:productId/edit', auth, editProduct)
router.delete('/:shopId/product/:productId/delete', auth, deleteProduct)

export default router
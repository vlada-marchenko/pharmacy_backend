import { Router } from 'express'
import { auth } from '../middlewares/auth.js'
import { getStatistics, getClientGoods } from '../controllers/stats.controller.js'

const router = Router()

router.get('/shop/:shopId/statistics', auth, getStatistics)
router.get('/shop/:shopId/statistics/:clientId/goods', auth, getClientGoods)

export default router
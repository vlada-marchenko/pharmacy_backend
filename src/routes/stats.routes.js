import { Router } from 'express'
import { auth } from '../middlewares/auth.js'
import { getStatistics, getClientGoods } from '../controllers/stats.controller.js'

const router = Router()

router.get('/:shopId/statistics', getStatistics)
router.get('/:shopId/statistics/:clientId/goods', auth, getClientGoods)

export default router

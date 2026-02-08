import { Router } from 'express'
import { auth } from '../middlewares/auth.js'
import { getMedicineById, listMedicines } from '../controllers/medicine.controller.js'

const router = Router()

router.get('/medicine', auth, listMedicines)

router.get('/medicine/:medicineId', auth, getMedicineById)

export default router
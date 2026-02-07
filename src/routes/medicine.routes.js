import { Router } from 'express'
import auth from '../middlewares/auth.js'
import { getMedicineById, listMedicines } from '../controllers/medicine.controller.js'

const router = Router()

router.get('/api/medicine', auth, listMedicines)

router.get('/api/medicine/:medicineId', auth, getMedicineById)
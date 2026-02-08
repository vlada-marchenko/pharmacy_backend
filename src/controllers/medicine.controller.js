import Medicine from "../models/Medicine.js";

export async function listMedicines(req, res, next) {
    try {
        const medicines = await Medicine.find().sort({ name: 1 }).lean()
        const categories = [...new Set(medicines.map(m => m.category).filter(Boolean))].sort()
        res.json({ medicines, categories })
    } catch (err) {
        next(err)
    }
}

export async function getMedicineById(req, res, next) {
    try {
        const { medicineId } = req.params
        
        const medicine = await Medicine.findById(medicineId).lean()
        if (!medicine) return res.status(404).json({ message: 'Medicine not found' })

        medicine.price = medicine.price ? Number(medicine.price) : null

        res.json(medicine)
    } catch (err) {
        next(err)
    }
}
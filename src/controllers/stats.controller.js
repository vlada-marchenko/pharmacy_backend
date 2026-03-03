import Transaction from "../models/Transaction.js";
import Customers from "../models/Customers.js";
import Product from '../models/Product.js'

export async function getStatistics(req, res, next) {
    try {
        const { shopId } = req.params
        if (!shopId) return res.status(400).json({ message: 'Mising shopId'})
        
        const [
            totalCustomers,
            totalProducts,
            customers,
            transactions
        ] = await Promise.all([
            Customers.countDocuments({}),
            Product.countDocuments({ shopId }),
            Customers.find({}).select('name email spent bought_products').populate({ path: 'bought_products.productId', select: 'name price photo category' }).sort({ createdAt: -1 }).limit(5),
            Transaction.find({}).select('name amount type').sort({ createdAt: -1 }).limit(12)
        ])

        const transactionsByType = {
            Income: transactions.filter(t => t.type === 'Income'),
            Expense: transactions.filter(t => t.type === 'Expense'),
            Error: transactions.filter(t => t.type === 'Error'),
            Unknown: transactions.filter(t => !['Income', 'Expense', 'Error'].includes(t.type))
        }
        
        return res.json({
            totalCustomers,
            totalProducts,
            customers,
            transactions,
            transactionsByType
        })
    } catch (err) {
        next(err)
    }
}

export async function getClientGoods(req, res, next) {
    try {
         const { shopId, clientId } = req.params

        if (!shopId) return res.status(400).json({ message: 'Missing shopId' })

        let customer = await Customers.findOne({ _id: clientId, shopId }).select('name email spent bought_products').populate({ path: 'bought_products.productId', select: 'name price photo category' })

        if (!customer) {
            customer = await Customers.findById(clientId).select('name email spent bought_products').populate({ path: 'bought_products.productId', select: 'name price photo category'})
        }

        if (!customer) return res.status(404).json({ message: 'Client not found '})

        const orders = (customer.bought_products || []).map((p) => {
            const prod = p.productId
            return {
                productId: prod?._id ?? p.productId,
                name: prod?.name ?? p.name,
                price: prod?.price ?? p.price,
                category: prod?.category ?? p.category
            }
        })

        return res.json({
            customer: {
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                spent: customer.spent
            },
            orders
        })
    } catch (err) {
        next(err)
    }
}

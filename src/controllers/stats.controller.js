import Transaction from "../models/Transaction.js";
import Customers from "../models/Customers.js";
import Product from '../models/Product.js'

export async function getStatistics(req, res, next) {
    try {
        const { shopId } = req.params

        if (!shopId) return res.status(400).json({ message: 'Mising shopId'})

        const hasShopCustomers = await Customers.exists({ shopId })
        const hasShopTransactions = await Transaction.exists({ shopId })

        const customersFilter = hasShopCustomers ? { shopId } : {}
        const transactionsFilter = hasShopTransactions ? { shopId } : {}
        
        const [
            totalCustomers,
            totalProducts,
            customers,
            transactions
        ] = await Promise.all([
            Customers.countDocuments(customersFilter),
            Product.countDocuments({ shopId }),
            Customers.find(customersFilter).select('name email spent bought_products').populate({ path: 'bought_products.productId', select: 'name price photo category' }),
            Transaction.find(transactionsFilter).select('name amount type')
        ])

        const transactionsByType = {
            Income: [],
            Expense: [],
            Error: [], 
            Unknown: []
        }

        for (const t of transactions) {
            if (t.type === 'Income') transactionsByType.Income.push(t)
            else if (t.type === 'Expense') transactionsByType.Expense.push(t)
            else if (t.type === 'Error') transactionsByType.Error.push(t)
            else transactionsByType.Unknown.push(t)
        }

        return res.json({
            totalCustomers,
            totalProducts,
            customers,
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
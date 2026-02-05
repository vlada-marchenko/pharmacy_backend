import Product from '../models/Product.js'

export async function getProducts(req, res, next) {
    try {
        const { q, category } = req.query

        const filter = {}
        if (category) filter.category = category
        if (q) filter.name = { $regex: q, $options: 'i' }

        const products = (await Product.find(filter))
        res.json(products)
    } catch (err) {
        next(err)
    }
}

export async function getProductById(req, res, next) {
    try { 
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: 'Product not found' })
        res.json(product)    
    } catch (err) {
        next(err)
    }
}
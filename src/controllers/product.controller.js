import Product from "../models/Product.js";

export async function listProducts(req, res, next) {
  try {
    const { shopId } = req.params;

    const items = await Product.find({ shopId }).populate("medicineId")
      .sort({ createdAt: -1 })
      .lean();

    const products = items.map((i) => ({
      id: i._id,
      medicineId: i.medicineId?._id || null,
      name: i.medicineId?.name ?? i.name,
      photo: i.medicineId?.photo ?? i.photo,
      category: i.medicineId?.category ?? i.category,
      price: i.price,
    }));

    res.json({ products });
  } catch (err) {
    next(err);
  }
}

export async function addProduct(req, res, next) {
  try {
    const { shopId } = req.params;

    const { medicineId, name, photo, category, price } = req.body;

    if (medicineId) {
            if (price === undefined) {
      return res
        .status(400)
        .json({ message: "Price is required to add medicine to the shop" });
    }
        const created = await Product.create({ shopId, medicineId, price: Number(price) })
        return res.status(201).json({ id: created._id })
    }

    if (!name || !photo || !category || price === undefined) {
        return res.status(400).json({ message: 'Missing required fields'})
    }


    const created = await Product.create({
      shopId,
      name: name.trim(),
      photo,
      category: category.trim(),
      price: Number(price),
    });

    res.status(201).json({ id: created._id });
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ message: "This medicine is already added to shop" });
    }
    next(err);
  }
}

export async function getProductById(req, res, next) {
  try {
    const { shopId, productId } = req.params

    const item = await Product.findOne({ _id: productId, shopId }).populate('medicineId').lean()

    if (!item) return res.status(404).json({ message: 'Product not found' })

    res.json({
      id: item._id,
      medicineId: item.medicineId?._id || null,
      name: item.medicineId?.name ?? item.name,
      photo: item.medicineId?.photo ?? item.photo,
      category: item.medicineId?.category ?? item.category,
      price: item.price,
    })
  } catch (err) {
    next(err);
  }
}


export async function editProduct(req, res, next) {
    try {
        const { shopId, productId } = req.params
        const { price } = req.body

        const update = {}
        if (price !== undefined) update.price = Number(price)
        
        const updated = await Product.findOneAndUpdate(
            { _id: productId, shopId },
            update,
            { new: true }
        ).lean()

        if (!updated) return res.status(404).json({ message: 'Product not found' })

        res.json({ message: 'Updated'})
    } catch (err) {
        next(err)
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const { shopId, productId } = req.params

        const deleted = await Product.findOneAndDelete({ _id: productId, shopId }).lean()
        if (!deleted) return res.status(404).json({ message: 'Product not found' })

        res.json({ message: 'Deleted'})
    } catch (err) {
        next(err)
    }
}
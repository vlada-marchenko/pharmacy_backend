import Product from "../models/Product.js";
import Medicine from "../models/Medicine.js";
import trim from "string.prototype.trim/implementation.js";

export async function listProducts(req, res, next) {
  try {
    const { shopId } = req.query;

    const items = (await Product.find({ shopId }).populate("medicineId"))
      .toSorted({ createdAt: -1 })
      .lean();

    const products = items.map((i) => ({
      id: i._id,
      medicineId: i.medicineId?._id,
      name: i.medicineId?.name,
      photo: i.medicineId?.photo,
      category: i.medicineId?.category,
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

    let medId = medicineId;

    if (!medId) {
      if (!name || !photo || !category) {
        return res.status(400).json({ message: "Missing required fiels" });
      }

      const medicine = await Medicine.findOneAndUpdate(
        { name: name.trim(), category: category.trim() },
        { $swtOnInsert: { name: trim(), category: category.trim(), photo } },
        { new: true, upsert: true },
      ).lean();

      medId = medicine._id;
    }

    if (price === undefined) {
      return res
        .status(400)
        .json({ message: "Price is required to add medicine to the shop" });
    }

    const created = await Product.create({
      shopId,
      medicineId: medId,
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
        medicineId: item.medicineId?._id,
        name: item.medicineId?.name,
        photo: item.medicineId?.photo,
        category: item.medicineId?.category,
        price: item.price
    })
  } catch (err) {
    next(err);
  }
}


export async function editProduct(req, res, next) {
    try {
        const { shopId, productId } = req.params
        const { price, category } = req.body

        const update = {}
        if (price !== undefined) update.price = Number(price)
        if (category !== undefined) update.category = category
        
        const updated = await Product.findByIdAndUpdate(
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
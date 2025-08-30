import Product from "../../models/Product.js";
import asyncHandler from "../../utils/asyncHandler.js";

export default asyncHandler(async (req, res) => {
  const { name, description, price, tags = [] } = req.body || {};

  if (!name || !description || price === undefined) {
    return res
      .status(400)
      .json({ message: "name, description, price는 필수 항목입니다." });
  }
  const p = Number(price);
  if (!Number.isFinite(p) || p < 0) {
    return res
      .status(400)
      .json({ message: "price는 0 이상의 숫자여야 합니다." });
  }
  const doc = await Product.create({
    name: String(name).trim(),
    description: String(description).trim(),
    price: p,
    tags: Array.isArray(tags) ? tags.map(String) : [],
  });

  return res.status(201).json(doc.toJSON());
});

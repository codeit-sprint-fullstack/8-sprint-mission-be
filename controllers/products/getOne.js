import mongoose from "mongoose";
import Product from "../../models/Product.js";
import asyncHandler from "../../utils/asyncHandler.js";

const { isValidObjectId } = mongoose;

export default asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "유효하지 않은 id입니다." });
  }

  const doc = await Product.findById(id)
    .select("name description price tags createdAt")
    .lean({ virtuals: true });

  if (!doc) {
    return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
  }
  return res.json(doc);
});

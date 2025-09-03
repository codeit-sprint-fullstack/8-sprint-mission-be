import mongoose from "mongoose";
import Product from "../../models/Product.js";
import asyncHandler from "../../utils/asyncHandler.js";

const { isValidObjectId } = mongoose;

export default asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "유효하지 않은 id입니다." });
  }

  const result = await Product.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
  }
  return res.status(204).send();
});

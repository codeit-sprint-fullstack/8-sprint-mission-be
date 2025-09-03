import mongoose from "mongoose";
import Product from "../../models/Product.js";
import asyncHandler from "../../utils/asyncHandler.js";

const { isValidObjectId } = mongoose;

export default asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "유효하지 않은 id입니다." });
  }

  const up = {};
  if ("name" in req.body) {
    if (!req.body.name)
      return res.status(400).json({ message: "name은 비울 수 없습니다." });
    up.name = String(req.body.name).trim();
  }
  if ("description" in req.body) {
    if (!req.body.description)
      return res
        .status(400)
        .json({ message: "description은 비울 수 없습니다." });
    up.description = String(req.body.description).trim();
  }
  if ("price" in req.body) {
    const p = Number(req.body.price);
    if (!Number.isFinite(p) || p < 0) {
      return res
        .status(400)
        .json({ message: "price는 0 이상의 숫자여야 합니다." });
    }
    up.price = p;
  }
  if ("tags" in req.body) {
    if (!Array.isArray(req.body.tags)) {
      return res
        .status(400)
        .json({ message: "tags는 문자열 배열이어야 합니다." });
    }
    up.tags = req.body.tags.map(String);
  }

  if (Object.keys(up).length === 0) {
    return res.status(400).json({ message: "수정할 필드가 없습니다." });
  }

  const doc = await Product.findByIdAndUpdate(id, up, {
    new: true,
    runValidators: true,
  })
    .select("name description price tags createdAt updatedAt")
    .lean({ virtuals: true });

  if (!doc) {
    return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
  }
  return res.json(doc);
});

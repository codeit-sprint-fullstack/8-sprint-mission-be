import Product from "../../models/Product.js";
import asyncHandler from "../../utils/asyncHandler.js";

const toInt = (v, def) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : def;
};

export default asyncHandler(async (req, res) => {
  const page = Math.max(1, toInt(req.query.page, 1));
  const pageSize = Math.max(1, Math.min(50, toInt(req.query.pageSize, 10)));
  const keyword = String(req.query.keyword || req.query.q || "").trim();
  const orderBy = String(req.query.orderBy || "recent");

  const filter = {};
  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  const sort = orderBy === "recent" ? { createdAt: -1 } : { createdAt: -1 };

  const [totalCount, list] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select("name price createdAt")
      .lean({ virtuals: true }),
  ]);

  return res.json({
    list: list.map((r) => ({
      id: r.id,
      name: r.name,
      price: r.price,
      createdAt: r.createdAt,
    })),
    totalCount,
    page,
    pageSize,
  });
});

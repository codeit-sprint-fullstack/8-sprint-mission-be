import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

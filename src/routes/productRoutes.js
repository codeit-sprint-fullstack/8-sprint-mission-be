import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  toggleFavorite,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, upload.array("images", 3), createProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.post("/:id/favorite", authMiddleware, toggleFavorite);

export default router;

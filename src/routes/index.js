import express from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import articleRoutes from "./article.routes.js";
import commentRoutes from "./comment.routes.js";
import favoriteRoutes from "./favorite.routes.js";
import likeRoutes from "./like.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);
router.use("/favorites", favoriteRoutes); // product favorites
router.use("/likes", likeRoutes); // article likes

export default router;

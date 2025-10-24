import express from "express";
import { register, login } from "../controllers/authController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.post("/signUp", asyncHandler(register));
router.post("/signIn", asyncHandler(login));

export default router;

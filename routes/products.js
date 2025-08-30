import { Router } from "express";
import create from "../controllers/products/create.js";
import getOne from "../controllers/products/getOne.js";
import update from "../controllers/products/update.js";
import remove from "../controllers/products/remove.js";
import list from "../controllers/products/list.js";

const router = Router();

router.post("/", create); // 상품 등록
router.get("/:id", getOne); // 상품 상세목록 조회
router.patch("/:id", update); // 상품 수정
router.delete("/:id", remove); // 상품 삭제
router.get("/", list); //상품 목록 조회

export default router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../../utils/errorHandler");
const authGuard_1 = require("../../middlewares/authGuard");
const products_controller_1 = require("./products.controller");
const router = (0, express_1.Router)();
/* === 상품 api === */
router.get("", (0, errorHandler_1.asyncHandeler)(products_controller_1.getProductList));
router.get("/:id", (0, errorHandler_1.asyncHandeler)(products_controller_1.getProduct));
//로그인한 유저(verifyAccessToken), 소유권이 있는 유저(checkOwner)
router.post("", authGuard_1.verifyAccessToken, (0, errorHandler_1.asyncHandeler)(products_controller_1.createProduct));
router.patch("/:id", authGuard_1.verifyAccessToken, products_controller_1.checkOwner, (0, errorHandler_1.asyncHandeler)(products_controller_1.updateProduct));
router.delete("/:id", authGuard_1.verifyAccessToken, products_controller_1.checkOwner, (0, errorHandler_1.asyncHandeler)(products_controller_1.deleteProduct));
router.patch("/:id/favorite", authGuard_1.verifyAccessToken, (0, errorHandler_1.asyncHandeler)(products_controller_1.addFavorite));
router.post("/:id/checkOwner", authGuard_1.verifyAccessToken, products_controller_1.checkOwner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ owner: true });
}));
exports.default = router;
//# sourceMappingURL=products.routes.js.map
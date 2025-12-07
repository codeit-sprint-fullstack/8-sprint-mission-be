"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// // 도메인 라우터
const index_1 = __importDefault(require("./auth/index"));
const index_2 = __importDefault(require("./articles/index"));
const index_3 = __importDefault(require("./products/index"));
const index_4 = __importDefault(require("./comments/index"));
const index_5 = __importDefault(require("./uploads/index"));
const router = (0, express_1.Router)();
router.use("/auth", index_1.default);
router.use("/articles", index_2.default);
router.use("/products", index_3.default);
router.use("/", index_4.default);
router.use("/", index_5.default);
exports.default = router;
//# sourceMappingURL=index.js.map
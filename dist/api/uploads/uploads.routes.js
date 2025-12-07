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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const db_1 = __importDefault(require("../../config/db"));
const express_1 = require("express");
const errorTemplate_1 = require("../../config/errorTemplate");
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
//기존에 서버에 저장된 상품 이미지 삭제
function deleteFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const product = yield db_1.default.product.findUnique({
                where: { id },
                select: { images: true },
            });
            if (product) {
                for (let image of product.images) {
                    fs_1.default.unlink(`uploads/${image}`, (err) => {
                        if (err) {
                            console.error("삭제 실패:", err);
                        }
                        else {
                            console.log("삭제 성공");
                        }
                    });
                }
            }
            else {
                throw errorTemplate_1.ERROR_PRODUCT_NOTFOUND;
            }
        }
        catch (err) {
            next(err);
        }
        finally {
            next();
        }
    });
}
router.post("/products/:id/uploads", deleteFile, upload.array("images[]", 3), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files = [];
        if (Array.isArray(req.files)) {
            files = req.files;
        }
        else if (req.files && typeof req.files === "object") {
            //필드 네임으로 관리 안 하기 떄문에 에러 던지기.
            throw errorTemplate_1.ERROR_INVALID_MULTER_INPUT;
        }
        else {
            throw errorTemplate_1.ERROR_INVALID_MULTER_INPUT;
        }
        const images = req.files.map((file) => file.path.split(/uploads[\\/]/)[1]); //DB에는 경로(파일 이름)만 저장
        const { id } = req.params;
        const patch = yield db_1.default.product.update({
            where: { id },
            data: { images },
        });
        res.json(patch);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "업로드 실패" });
    }
}));
exports.default = router;
//# sourceMappingURL=uploads.routes.js.map
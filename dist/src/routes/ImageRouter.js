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
exports.ImageRouter = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const asyncErrorHandler_js_1 = require("./utils/asyncErrorHandler.js");
const AuthN_1 = require("../utils/auth/AuthN");
exports.ImageRouter = express_1.default.Router();
const imageUpload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.default.join(path_1.default.resolve(), 'public/images/'));
        },
        filename: function (req, file, cb) {
            cb(null, [Date.now(), file.originalname].join('-'));
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: function (req, file, cb) {
        if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
            return cb(new Error('Only png and jpeg are allowed'));
        }
        cb(null, true);
    },
});
// 파일 업로드 API
exports.ImageRouter.post('/upload', (0, AuthN_1.AuthN)(), imageUpload.single('image'), (0, asyncErrorHandler_js_1.asyncErrorHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        throw new Error('File not uploaded');
    }
    const filePath = path_1.default.join('static/images/', req.file.filename);
    res.send({
        url: `${process.env.BASE_URL}/${filePath}`,
    });
})));

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
exports.asyncHandeler = asyncHandeler;
const client_1 = require("@prisma/client");
/* 오류 검사 핸들러 */
function asyncHandeler(handler) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield handler(req, res, next);
            }
            catch (error) {
                const e = error;
                if (
                //설정한 struct 유효성검사와
                //prisma 자체 유효성 검사를 통과하는 지 검사합니다.
                e.name === "StructError" ||
                    e instanceof client_1.Prisma.PrismaClientValidationError) {
                    res.status(400).send({
                        ok: false,
                        message: e.message,
                    });
                }
                else if (e.name === "CastError") {
                    res.sendStatus(404);
                }
                else {
                    res.status(500).send({
                        ok: false,
                        message: e.message,
                    });
                }
            }
        });
    };
}
//# sourceMappingURL=errorHandler.js.map
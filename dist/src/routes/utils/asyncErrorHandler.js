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
exports.asyncErrorHandler = asyncErrorHandler;
const superstruct_1 = __importDefault(require("superstruct"));
const HttpException_1 = require("../../utils/exceptions/HttpException");
const BadRequestException_1 = require("../../utils/exceptions/BadRequestException");
const InternalServerErrorException_1 = require("../../utils/exceptions/InternalServerErrorException");
function asyncErrorHandler(handler) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield handler(req, res);
            }
            catch (e) {
                // 에러처리 로직을 일관화하기 위해, HttpException 으로 변환합니다.
                const httpException = mapToHttpException(e);
                handleHttpException(httpException, res);
            }
        });
    };
}
function handleHttpException(httpError, res) {
    res.status(httpError.status).send({
        name: httpError.name,
        message: httpError.message,
    });
}
/**
 * [에러로직 일관화를 위한, Exception 변환 메서드]
 *
 * 해당 메서드는 항상 HttpException 을 반환합니다.
 *
 * 동작:
 *   1. HttpException 이라면 그대로 반환합니다.
 *   2. Known Error 라면, 해당 에러에 맞는 HttpException 으로 변환합니다.
 *   3. Unknown Error 라면, InternalServerErrorException 으로 변환합니다.
 */
function mapToHttpException(e) {
    if (e instanceof HttpException_1.HttpException) {
        return e;
    }
    // Known Error
    if (e instanceof superstruct_1.default.StructError) {
        return new BadRequestException_1.BadRequestException('Validation Failed', e.message);
    }
    // 마지막까지 처리되지 않았다면, Unknown Error 입니다.
    // InternalServerErrorException 으로 변환합니다.
    return new InternalServerErrorException_1.InternalServerErrorException('Internal Server Error', e.message);
}

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
function asyncErrorHandler(handler) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield handler(req, res);
            }
            catch (e) {
                handleException(e, res);
            }
        });
    };
}
function handleException(e, res) {
    if (e instanceof superstruct_1.default.StructError) {
        res.status(400).send({
            name: 'BadRequest',
            message: 'Validation failed: ' + e.message,
        });
    }
    // Unknown Error 처리
    res.status(500).send({
        name: 'InternalServerError',
        message: 'Internal server error: ' + e.message,
    });
}

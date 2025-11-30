"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityException = void 0;
const HttpException_1 = require("./HttpException");
class UnprocessableEntityException extends HttpException_1.HttpException {
    constructor(name, message) {
        super({
            status: 422,
            name,
            message,
        });
    }
}
exports.UnprocessableEntityException = UnprocessableEntityException;

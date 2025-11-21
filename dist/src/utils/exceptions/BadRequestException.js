"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const HttpException_1 = require("./HttpException");
class BadRequestException extends HttpException_1.HttpException {
    constructor(name, message) {
        super({
            status: 400,
            name,
            message,
        });
    }
}
exports.BadRequestException = BadRequestException;

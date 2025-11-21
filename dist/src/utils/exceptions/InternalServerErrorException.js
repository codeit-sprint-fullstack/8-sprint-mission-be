"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = void 0;
const HttpException_1 = require("./HttpException");
class InternalServerErrorException extends HttpException_1.HttpException {
    constructor(name, message) {
        super({
            status: 500,
            name,
            message,
        });
    }
}
exports.InternalServerErrorException = InternalServerErrorException;

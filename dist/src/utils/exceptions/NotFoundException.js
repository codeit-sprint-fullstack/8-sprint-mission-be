"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const HttpException_1 = require("./HttpException");
class NotFoundException extends HttpException_1.HttpException {
    constructor(name, message) {
        super({
            status: 404,
            name,
            message,
        });
    }
}
exports.NotFoundException = NotFoundException;

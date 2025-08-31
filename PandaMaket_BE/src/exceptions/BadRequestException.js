import { HttpException } from './HttpException.js';

export class BadRequestException extends HttpException {
    constructor(name, message) {
        super({
            status: 400,
            name,
            message,
        });
    }
}

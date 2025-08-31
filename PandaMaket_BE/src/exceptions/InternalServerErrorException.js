import { HttpException } from './HttpException.js';

export class InternalServerErrorException extends HttpException {
    constructor(name, message) {
        super({
            status: 500,
            name,
            message,
        });
    }
}

import { HttpException } from './HttpException.js';

export class NotFoundException extends HttpException {
    constructor(name, message) {
        super({
            status: 404,
            name,
            message,
        });
    }
}

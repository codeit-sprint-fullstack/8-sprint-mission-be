import { HttpException } from './HttpException.js';

export class ForbiddenException extends HttpException {
    constructor(name: string, message: string) {
        super({
            status: 403,
            name,
            message,
        });
    }
}

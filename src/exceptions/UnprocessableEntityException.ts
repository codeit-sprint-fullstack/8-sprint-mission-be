import { HttpException } from './HttpException.js';

export class UnprocessableEntityException extends HttpException {
    constructor(name: string, message: string) {
        super({
            status: 422,
            name,
            message,
        });
    }
}

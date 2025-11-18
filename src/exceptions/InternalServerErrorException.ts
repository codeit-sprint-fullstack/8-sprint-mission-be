import { HttpException } from './HttpException.js';

export class InternalServerErrorException extends HttpException {
    constructor(name: string, message: string) {
        super({
            status: 500,
            name,
            message,
        });
    }
}

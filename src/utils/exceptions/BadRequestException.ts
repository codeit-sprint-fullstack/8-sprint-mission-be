import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
    constructor(name: string, message: string) {
        super({
            status: 400,
            name,
            message,
        });
    }
}

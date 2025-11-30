import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
    constructor(name: string, message: string) {
        super({
            status: 404,
            name,
            message,
        });
    }
}

import superstruct from 'superstruct';
import { Request, Response } from 'express';

import { HttpException } from '../../utils/exceptions/HttpException';
import { BadRequestException } from '../../utils/exceptions/BadRequestException';
import { InternalServerErrorException } from '../../utils/exceptions/InternalServerErrorException';

export function asyncErrorHandler(handler: (req: Request, res: Response) => Promise<void>) {
    return async function (req: Request, res: Response) {
        try {
            await handler(req, res);
        } catch (e) {
            // 에러처리 로직을 일관화하기 위해, HttpException 으로 변환합니다.
            const httpException = mapToHttpException(e as Error);
            handleHttpException(httpException, res);
        }
    };
}

function handleHttpException(httpError: {name: string, message: string, status: number}, res: Response): void {
    res.status(httpError.status).send({
        name: httpError.name,
        message: httpError.message,
    });
}

/**
 * [에러로직 일관화를 위한, Exception 변환 메서드]
 *
 * 해당 메서드는 항상 HttpException 을 반환합니다.
 *
 * 동작:
 *   1. HttpException 이라면 그대로 반환합니다.
 *   2. Known Error 라면, 해당 에러에 맞는 HttpException 으로 변환합니다.
 *   3. Unknown Error 라면, InternalServerErrorException 으로 변환합니다.
 */
function mapToHttpException(e: Error): HttpException {
    if (e instanceof HttpException) {
        return e;
    }

    // Known Error
    if (e instanceof superstruct.StructError) {
        return new BadRequestException('Validation Failed', e.message);
    }

    // 마지막까지 처리되지 않았다면, Unknown Error 입니다.
    // InternalServerErrorException 으로 변환합니다.
    return new InternalServerErrorException('Internal Server Error', e.message);
}

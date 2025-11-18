import superstruct from 'superstruct';
import { Request, Response } from 'express';

export function asyncErrorHandler(handler: (req: Request, res: Response) => Promise<void>) {
    return async function (req: Request, res: Response): Promise<void> {
        try {
            await handler(req, res);
        } catch (e) {
            handleException(e as Error, res);
        }
    };
}

function handleException(e: Error, res: Response): void {
    if (e instanceof superstruct.StructError) {
        res.status(400).send({
            name: 'BadRequest',
            message: 'Validation failed: ' + e.message,
        });
    }

    // Unknown Error 처리
    res.status(500).send({
        name: 'InternalServerError',
        message: 'Internal server error: ' + e.message,
    });
}

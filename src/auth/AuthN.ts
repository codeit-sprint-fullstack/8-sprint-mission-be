import { AuthTokenManager } from './AuthTokenManager';
import { Request, Response, NextFunction } from "express";

export function AuthN(): (req: Request, res: Response, next: NextFunction) => void | Response {
    return function (req: Request, res: Response, next: NextFunction): void | Response {
        const jwtToken: string|undefined = req?.headers?.authorization?.split(' ')[1];

        if (!jwtToken) {
            return res.status(401).send({
                name: 'Unauthorized',
                message: 'JWT token is missing',
            });
        }
        if (!AuthTokenManager.isValidAccessToken(jwtToken)) {
            return res.status(401).send({
                name: 'Unauthorized',
                message: 'Invalid JWT token',
            });
        }

        return next();
    }
}
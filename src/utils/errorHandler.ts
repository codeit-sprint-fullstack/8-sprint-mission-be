import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

type handlerType = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<Response> | Promise<void>;

/* 오류 검사 핸들러 */
export function asyncHandeler(handler: handlerType) {
  return async function (req: Request, res: Response, next?: NextFunction) {
    try {
      await handler(req, res, next);
    } catch (error) {
      const e = error as Error;
      if (
        //설정한 struct 유효성검사와
        //prisma 자체 유효성 검사를 통과하는 지 검사합니다.
        e.name === "StructError" ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({
          ok: false,
          message: e.message,
        });
      } else if (e.name === "CastError") {
        res.sendStatus(404);
      } else {
        res.status(500).send({
          ok: false,
          message: e.message,
        });
      }
    }
  };
}

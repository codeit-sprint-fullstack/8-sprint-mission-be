import { Prisma } from '@prisma/client';

/* 오류 검사 핸들러 */
export function asyncHandeler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        //설정한 struct 유효성검사와
        //prisma 자체 유효성 검사를 통과하는 지 검사합니다.
        e.name === 'StructError' ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (e.name === 'CastError') {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

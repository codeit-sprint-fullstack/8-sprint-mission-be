import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

type PrismaModels = keyof typeof prisma;

export const checkOwnership = (model: PrismaModels) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const record = await (prisma[model] as any).findUnique({ where: { id } });

    if (!record) return res.status(404).json({ message: "존재하지 않습니다." });
    if (record.userId !== req.user.id)
      return res.status(403).json({ message: "권한이 없습니다." });

    next();
  };
};

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "토큰이 필요합니다." });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: string;
    };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user)
      return res.status(401).json({ message: "유효하지 않은 사용자입니다." });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};

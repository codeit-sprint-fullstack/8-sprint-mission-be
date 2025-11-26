import { User } from "@prisma/client";
import multer from "multer";

declare global {
  namespace Express {
    interface Request {
      user?: User & { id: string };
      files?: Express.Multer.File[];
    }
  }
}

export {};

import { Express } from "express";

//Express 프로퍼티 확장
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
      };
      valid?: boolean;
    }
    interface User {
      id?: string;
    }
  }
}

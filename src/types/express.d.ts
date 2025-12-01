import 'express';

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        [key: string]: any;
      };
    }
  }
}

export {};

import path from 'path';
import multer from 'multer';
import express, { Response, Request } from 'express';



import { asyncErrorHandler } from './utils/asyncErrorHandler.js';
import { AuthN } from '../utils/auth/AuthN';

export const ImageRouter = express.Router();

const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(path.resolve(), 'public/images/'));
        },
        filename: function (req, file, cb) {
            cb(null, [Date.now(), file.originalname].join('-'));
        },
    }),

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter: function (req, file, cb) {
        if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
            return cb(new Error('Only png and jpeg are allowed'));
        }

        cb(null, true);
    },
});

// 파일 업로드 API
ImageRouter.post(
    '/upload',
    AuthN(),
    imageUpload.single('image'),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        if (!req.file) {
            throw new Error('File not uploaded');
        }
        const filePath = path.join('static/images/', req.file.filename);
        res.send({
            url: `${process.env.BASE_URL}/${filePath}`,
        });
    }),
);

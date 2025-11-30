// 라이브러리 로드
import { create } from 'superstruct';
import express, {Request, Response} from 'express';

// 유틸리티 로드
import { AuthN } from '../utils/auth/AuthN';
import { AuthTokenManager } from '../utils/auth/AuthTokenManager.js';
import { asyncErrorHandler } from '../utils/asyncErrorHandler';

// Structs 로드
import { UpdateCommentRequestStruct } from '../utils/structs/comment/UpdateCommentRequestStruct';

// 핸들러 로드
import { UpdateCommentHandler } from '../service/comment/UpdateCommentHandler';
import { DeleteCommentHandler } from '../service/comment/DeleteCommentHandler';

// 타입 로드
import {Comment} from "@prisma/client";

export const CommentRouter = express.Router();

// 댓글 수정 api
CommentRouter.patch(
    '/:commentId',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization as string);

        const { commentId } = req.params;
        const { content } = create(req.body, UpdateCommentRequestStruct);

        const commentView = await UpdateCommentHandler.handle(requester, {
            commentId: Number(commentId),
            content: content as Comment['content'],
        });

        res.send(commentView);
    }),
);

// 댓글 삭제 api
CommentRouter.delete(
    '/:commentId',
    AuthN(),
    asyncErrorHandler(async (req: Request, res: Response): Promise<void> => {
        let requester = undefined;
        if (req.headers.authorization != null) {
            requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);
        }

        const { commentId } = req.params;

        await DeleteCommentHandler.handle(requester, Number(commentId));

        res.status(204).send();
    }),
);

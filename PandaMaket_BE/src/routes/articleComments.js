const express = require('express');
// articleId 파라미터 사용을 위해 mergeParams: true
const router = express.Router({ mergeParams: true });
const { prisma } = require('../lib/prisma');

function posInt(v) {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : null;
}

/**
 * 댓글 등록 (자유게시판)
 * POST /articles/:articleId/comments
 * body: { content }
 */
router.post('/', async (req, res, next) => {
    try {
        const articleId = posInt(req.params.articleId);
        if (!articleId) return res.status(400).json({ message: '잘못된 articleId 입니다.' });

        const { content } = req.body || {};
        if (!content) return res.status(400).json({ message: 'content는 필수입니다.' });

        const exists = await prisma.article.findUnique({
            where: { id: articleId },
            select: { id: true },
        });
        if (!exists) return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });

        const created = await prisma.comment.create({
            data: { content, articleId },
            select: { id: true, content: true, createdAt: true },
        });
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
});

/**
 * 댓글 수정 (PATCH)
 * PATCH /articles/:articleId/comments/:commentId
 * body: { content }
 */
router.patch('/:commentId', async (req, res, next) => {
    try {
        const articleId = posInt(req.params.articleId);
        const commentId = posInt(req.params.commentId);
        if (!articleId || !commentId) {
            return res.status(400).json({ message: '잘못된 경로 파라미터입니다.' });
        }

        const { content } = req.body || {};
        if (!content) return res.status(400).json({ message: 'content는 필수입니다.' });

        const updated = await prisma.comment.update({
            where: { id: commentId },
            data: { content },
            select: { id: true, content: true, createdAt: true },
        });

        if (updated && updated.articleId && updated.articleId !== articleId) {
        }

        res.json(updated);
    } catch (err) {
        if (err.code === 'P2025')
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
        next(err);
    }
});

/**
 * 댓글 삭제
 * DELETE /articles/:articleId/comments/:commentId
 */
router.delete('/:commentId', async (req, res, next) => {
    try {
        const articleId = posInt(req.params.articleId);
        const commentId = posInt(req.params.commentId);
        if (!articleId || !commentId) {
            return res.status(400).json({ message: '잘못된 경로 파라미터입니다.' });
        }

        await prisma.comment.delete({ where: { id: commentId } });
        res.json({ message: '댓글이 삭제되었습니다.' });
    } catch (err) {
        if (err.code === 'P2025')
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
        next(err);
    }
});

/**
 * 댓글 목록 (cursor 페이지네이션)
 * GET /articles/:articleId/comments?cursor=<id>&take=10
 *  - 기본 정렬: id DESC (최신 먼저)
 *  - 응답: { items, nextCursor }
 */
router.get('/', async (req, res, next) => {
    try {
        const articleId = posInt(req.params.articleId);
        if (!articleId) return res.status(400).json({ message: '잘못된 articleId 입니다.' });

        const take = posInt(req.query.take) || 10;
        const cursorId = req.query.cursor ? posInt(req.query.cursor) : null;

        const items = await prisma.comment.findMany({
            where: { articleId },
            orderBy: { id: 'desc' },
            take: take + 1, // 다음 페이지 유무 확인을 위해 +1
            ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
            select: { id: true, content: true, createdAt: true },
        });

        let nextCursor = null;
        if (items.length > take) {
            nextCursor = items[take].id;
            items.pop();
        }

        res.json({ items, nextCursor });
    } catch (err) {
        next(err);
    }
});

module.exports = router;

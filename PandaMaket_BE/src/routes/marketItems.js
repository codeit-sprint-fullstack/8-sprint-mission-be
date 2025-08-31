const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');

function intParam(v) {
    const n = Number(v);
    if (!Number.isInteger(n) || n < 0) return null;
    return n;
}

/**
 * 상품 등록
 * POST /market-items
 * body: { title, content }
 */
router.post('/', async (req, res, next) => {
    try {
        const { title, content } = req.body || {};
        if (!title || !content) {
            return res.status(400).json({ message: 'title, content는 필수입니다.' });
        }
        const created = await prisma.marketItem.create({
            data: { title, content },
            select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
        });
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
});

/**
 * 상품 단일 조회
 * GET /market-items/:id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const id = intParam(req.params.id);
        if (id === null) return res.status(400).json({ message: '잘못된 id 입니다.' });

        const item = await prisma.marketItem.findUnique({
            where: { id },
            select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
        });
        if (!item) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        res.json(item);
    } catch (err) {
        next(err);
    }
});

/**
 * 상품 수정
 * PUT /market-items/:id
 */
router.put('/:id', async (req, res, next) => {
    try {
        const id = intParam(req.params.id);
        if (id === null) return res.status(400).json({ message: '잘못된 id 입니다.' });

        const { title, content } = req.body || {};
        if (!title && !content) {
            return res.status(400).json({ message: '수정할 title 또는 content가 필요합니다.' });
        }

        const updated = await prisma.marketItem.update({
            where: { id },
            data: { title, content, updatedAt: new Date() },
            select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
        });
        res.json(updated);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }
        next(err);
    }
});

/**
 * 상품 삭제
 * DELETE /market-items/:id
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const id = intParam(req.params.id);
        if (id === null) return res.status(400).json({ message: '잘못된 id 입니다.' });

        await prisma.marketItem.delete({ where: { id } });
        res.json({ message: '상품이 삭제되었습니다.' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }
        next(err);
    }
});

/**
 * 상품 목록 (offset 페이지네이션, 검색/정렬)
 * GET /market-items?offset=0&limit=10&sort=recent|oldest&search=단어
 */
router.get('/', async (req, res, next) => {
    try {
        let { offset = '0', limit = '10', sort = 'recent', search = '' } = req.query;
        const _offset = intParam(offset);
        const _limit = intParam(limit);
        if (_offset === null || _limit === null) {
            return res.status(400).json({ message: 'offset, limit은 0 이상의 정수여야 합니다.' });
        }

        const where = search
            ? {
                  OR: [
                      { title: { contains: String(search) } },
                      { content: { contains: String(search) } },
                  ],
              }
            : {};

        const orderBy =
            String(sort) === 'recent'
                ? { createdAt: 'desc' }
                : String(sort) === 'oldest'
                ? { createdAt: 'asc' }
                : { createdAt: 'desc' };

        const list = await prisma.marketItem.findMany({
            where,
            orderBy,
            skip: _offset,
            take: _limit,
            select: { id: true, title: true, content: true, createdAt: true },
        });

        res.json(list);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

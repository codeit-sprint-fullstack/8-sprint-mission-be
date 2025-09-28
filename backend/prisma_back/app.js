import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//cors 설정
const corsOptions = {
    origin: ['http://localhost:3000'], //프론트엔드 개발 로컬 주소
    // origin: ['https://pandamarket-1.onrender.com/api'] //render 배포 주소
};
app.use(cors(corsOptions));

// // 정적 파일 서빙
// app.use(express.static(path.join(__dirname, 'frontend/build')));

// // SPA 라우팅 처리 (React Router 등)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
// });

/* 오류 검사 핸들러 */
function asyncHandeler(handler) {
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

/* === 상품 api === */ //마이그레이션
app.get(
    '/products',
    asyncHandeler(async (req, res) => {
        const { page = 1, pageSize = 10, orderBy = 'newest', keyword = '' } = req.query;

        const limit = parseInt(pageSize);
        const offset = (parseInt(page) - 1) * limit;

        const products = await prisma.product.findMany({
            where: {
                // 검색 쿼리
                OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
            },
            orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
            skip: parseInt(offset),
            take: parseInt(limit),
        });
        res.send(products);
    })
);

app.get(
    '/products/:id',
    asyncHandeler(async (req, res) => {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
        });
        res.send(product);
    })
);

app.post(
    '/products',
    asyncHandeler(async (req, res) => {
        const product = await prisma.product.create({
            data: req.body,
        });

        res.status(201).send(product);
    })
);

app.patch(
    '/products/:id',
    asyncHandeler(async (req, res) => {
        const { id } = req.params;
        const product = await prisma.product.update({
            where: { id },
            data: req.body,
        });

        res.send(product);
    })
);

app.delete(
    '/products/:id',
    asyncHandeler(async (req, res) => {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id },
        });
        res.sendStatus(204);
    })
);

/* === 게시글 api === */
app.get(
    '/articles',
    asyncHandeler(async (req, res) => {
        const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = req.query;

        const limit = parseInt(pageSize);
        const offset = (parseInt(page) - 1) * limit;

        const articles = await prisma.article.findMany({
            where: {
                // 검색 쿼리
                OR: [{ title: { contains: keyword } }, { content: { contains: keyword } }],
            },
            orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
            skip: parseInt(offset),
            take: parseInt(limit),
        });
        res.send(articles);
    })
);

app.get(
    '/articles/:id',
    asyncHandeler(async (req, res) => {
        const { id } = req.params;
        const article = await prisma.article.findUnique({
            where: { id },
        });
        res.send(article);
    })
);

app.post(
    '/articles',
    asyncHandeler(async (req, res) => {
        const article = await prisma.article.create({
            data: req.body,
        });

        res.status(201).send(article);
    })
);

app.patch(
    '/articles/:id',
    asyncHandeler(async (req, res) => {
        const { id } = req.params;
        const article = await prisma.article.update({
            where: { id },
            data: req.body,
        });

        res.send(article);
    })
);

app.delete(
    '/articles/:id',
    asyncHandeler(async (req, res) => {
        const { id } = req.params;
        await prisma.article.delete({
            where: { id },
        });
        res.sendStatus(204);
    })
);

/* === 댓글 api === */
/* === 상품 댓글 api  === (조회, 생성) */
app.get(
    '/products/:id/comments',
    asyncHandeler(async (req, res) => {
        const productId = req.params.id;
        const { pageSize = 10, lastId = '', orderBy = 'recent', keyword = '' } = req.query;

        const limit = parseInt(pageSize);

        //cursor 방식 페이지네이션
        const comments = await prisma.comment.findMany({
            where: { productId },
            skip: lastId ? 1 : 0, //cursor 항목 제외
            take: parseInt(limit),
            cursor: lastId,
            ...(lastId && { cursor: { id: lastId } }), //lastId를 쿼리로 받으면 커서 사용.

            //댓글에는 아직 favoriteCount가 없지만 일단 구현했습니다.(쿼리로 전달하지 말아주세요)
            orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
        });
        res.json(comments);
    })
);

app.get(
    '/products/:productId/comments/:id',
    asyncHandeler(async (req, res) => {
        const { productId, id } = req.params;
        const comments = await prisma.comment.findMany({
            where: {
                productId,
                id,
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(comments);
    })
);

app.post(
    '/products/:id/comments',
    asyncHandeler(async (req, res) => {
        const productId = req.params.id;
        const { content } = req.body;

        const comment = await prisma.comment.create({
            data: {
                content,
                article: {
                    connect: { id: productId },
                },
            },
        });
        res.status(201).json(comment);
    })
);

/* === 게시글 댓글 api === (조회, 생성) */
app.get(
    '/articles/:id/comments',
    asyncHandeler(async (req, res) => {
        const articleId = req.params.id;
        const { pageSize = 10, lastId = '', orderBy = 'recent', keyword = '' } = req.query;

        const limit = parseInt(pageSize);

        //cursor 방식 페이지네이션
        const comments = await prisma.comment.findMany({
            where: { articleId },
            skip: lastId ? 1 : 0, //cursor 항목 제외
            take: limit,
            ...(lastId && { cursor: { id: lastId } }), //lastId를 쿼리로 받으면 커서 사용.

            orderBy: orderBy == 'recent' ? { createdAt: 'desc' } : { favoriteCount: 'desc' },
        });
        res.json(comments);
    })
);

app.get(
    '/articles/:articleId/comments/:id',
    asyncHandeler(async (req, res) => {
        const { articleId, id } = req.params;
        const comments = await prisma.comment.findMany({
            where: {
                articleId,
                id,
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(comments);
    })
);

app.post('/articles/:id/comments', async (req, res) => {
    const articleId = req.params.id;
    const { content } = req.body;

    const comment = await prisma.comment.create({
        data: {
            content,
            article: {
                connect: { id: articleId },
            },
        },
    });
    res.status(201).json(comment);
});

/* === 공통 댓글 api (삭제, 수정)=== */
app.patch(
    '/comments/:id',
    asyncHandeler(async (req, res) => {
        const id = req.params.id;
        const { content } = req.body;

        const updated = await prisma.comment.update({
            where: { id },
            data: { content },
        });
        res.json(updated);
    })
);

app.delete(
    '/comments/:id',
    asyncHandeler(async (req, res) => {
        const { id } = req.params;
        await prisma.comment.delete({
            where: { id },
        });
        res.sendStatus(204);
    })
);

app.listen(process.env.PORT || 3001, () => console.log('Server Started'));

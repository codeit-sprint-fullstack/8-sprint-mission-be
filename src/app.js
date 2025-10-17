import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRouter from './routes/user.js';
import articleRouter from './routes/article.js';
import commentRouter from './routes/comment.js';
import productRouter from './routes/product.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

dotenv.config();
console.log('Prisma ready');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', // 특정 출처만 허용
    credentials: true, // 쿠키 허용
  }),
);
app.use(express.json());

// User API
app.use('/users', userRouter);
// Product(중고마켓) API
app.use('/products', productRouter);
// Article(자유게시판) API
app.use('/articles', articleRouter);
// Comment(댓글) API
app.use('/comments', commentRouter);

// 에러 핸들러 (라우터 등록 후 마지막에 추가)
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));

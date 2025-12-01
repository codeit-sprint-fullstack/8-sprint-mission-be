import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './api/index.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const corsOptions = {
  origin: ['http://localhost:3000'], //프론트엔드 개발 로컬 주소
  credentials: true,
};

//app, 전역 미들웨어
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//라우터
app.use(router);
app.use('/uploads', express.static('uploads')); //파일 다운로드 경로

//에러 핸들러
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server Started');
  console.log(`Post: http://localhost:${PORT}`); //로컬 호스트 포트
});

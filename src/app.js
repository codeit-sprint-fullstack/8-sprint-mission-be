// 라이브러리 import
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from './config/passport.js';
// Swagger Setting
import { specs, swaggerUiOptions } from './swaggerOptions.js';

// 라우터 import
import productRouter from './routes/productRouter.js';
import articleRouter from './routes/articleRouter.js';
import commentRouter from './routes/commentRouter.js';
import authRouter from './routes/authRouter.js';

const app = express();

// Render 프록시 신뢰
app.set('trust proxy', 1);

// 미들웨어 설정
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Morgan 로깅
app.use(morgan('combined'));

// 라우터 설정
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);

// Swagger API Docs Setting
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// /health 경로 처리
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `경로 ${req.originalUrl}를 찾을 수 없습니다.`,
  });
});

// Global 에러 핸들러
app.use((err, req, res, next) => {
  // Prisma 오류 처리
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: '중복된 데이터가 존재합니다.',
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: '요청한 데이터를 찾을 수 없습니다.',
    });
  }

  // JWT 오류 처리
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: '유효하지 않은 토큰입니다.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: '토큰이 만료되었습니다.',
    });
  }

  // 이미 응답이 전송된 경우 무시
  if (res.headersSent) {
    return next(err);
  }

  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

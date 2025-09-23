// 라이브러리 import
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import helmet from 'helmet';

// Swagger Setting
import { specs, swaggerUiOptions } from './swaggerOptions.js';

// 라우터 import
import productRoutes from './routes/productRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();

// Render 프록시 신뢰
app.set('trust proxy', 1);

// 미들웨어 설정
app.use(helmet());
app.use(cors());
app.use(express.json());

// Morgan 로깅
app.use(morgan('combined'));

// 라우터 설정
app.use('/products', productRoutes);
app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);

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
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

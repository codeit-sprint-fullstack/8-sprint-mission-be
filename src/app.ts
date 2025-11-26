import 'dotenv/config';
import express from 'express';
import cors from './config/cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { specs, swaggerUiOptions } from './config/swagger';
import cookieParser from 'cookie-parser';

// Router import
import authRouter from './routes/auth.route';
import tokenRouter from './routes/token.route';
import productRouter from './routes/product.route';

const app = express();

app.set('trust proxy', 1);

// Middleware Setup
app.use(helmet());
app.use(cors);
app.use(cookieParser());

// TODO: passport 추가
app.use(express.json());
// app.use(passport.initialize());
app.use(morgan('combined'));

// Routes
app.use('/auth', authRouter);
app.use('/token', tokenRouter);
app.use('/products', productRouter);

// Swagger Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '경로를 찾을 수 없습니다.',
  });
});

// Global Error Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

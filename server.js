const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRouter = require('./routes/products');
require('dotenv').config();

const app = express();
app.use(express.json());

//CORS 설정
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// 기본 라우트
app.get('/', (req, res) => {
  res.send('중고마켓 API 서버 🚀');
});

// products 라우트
app.use('/products', productsRouter);

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

// DB 연결 후 서버 시작
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

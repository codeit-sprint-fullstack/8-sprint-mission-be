const express = require('express');
const morgan = require('morgan');

const articlesRouter = require('./routes/articles');
const marketItemsRouter = require('./routes/marketItems');
const articleCommentsRouter = require('./routes/articleComments');
const marketItemCommentsRouter = require('./routes/marketItemComments');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));

// 본문 리소스
app.use('/articles', articlesRouter);
app.use('/market-items', marketItemsRouter);

// 댓글 리소스 (각 리소스에 종속)
app.use('/articles/:articleId/comments', articleCommentsRouter);
app.use('/market-items/:marketItemId/comments', marketItemCommentsRouter);

// 공통 에러 핸들러
app.use((err, _req, res, _next) => {
    console.error(err);
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;

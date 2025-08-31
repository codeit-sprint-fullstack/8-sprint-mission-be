require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const articles = require('./routes/articles');
const products = require('./routes/products');
const comments = require('./routes/comments');
const { notFound, errorHandler } = require('./middlewares/error');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ ok: true }));

app.use('/api/articles', articles);
app.use('/api/products', products);
app.use('/api/comments', comments);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));

module.exports = app;
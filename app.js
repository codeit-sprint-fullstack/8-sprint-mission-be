import express from 'express';
import * as dotenv from 'dotenv';
import prisma from './prisma/prismaClient.js';
import articleRouter from './routes/article.js';
import commentRouter from './routes/comment.js';
import isUUID from 'is-uuid';


dotenv.config();
console.log('Prisma ready');

const app = express();
app.use(express.json());

function asyncHandler(handler) {
  async function asyncReqHandler(req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: e.message });
      } else if (e.name === 'CastError') {
        res.status(404).send({ message: 'Cannot find given id.' });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  }

  return asyncReqHandler;
}


// Prisma 기반 Product 목록 조회
app.get('/products', asyncHandler(async (req, res) => {
  const sort = req.query.sort;
  const orderBy = sort === 'price' ? { price: 'desc' } : { createdAt: 'desc' };
  const products = await prisma.product.findMany({ orderBy });
  res.send(products);
}));


app.get('/products/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!isUUID.v4(id)) return res.status(400).send({ message: 'Invalid id format.' });
  const product = await prisma.product.findUnique({ where: { id } });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));


app.post('/products', asyncHandler(async (req, res) => {
  const { name, description, price, tags } = req.body;
  const newProduct = await prisma.product.create({
    data: { name, description, price, tags },
  });
  res.status(201).send(newProduct);
}));


app.patch('/products/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!isUUID.v4(id)) return res.status(400).send({ message: 'Invalid id format.' });
  try {
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });
    res.send(product);
  } catch {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));


app.delete('/products/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!isUUID.v4(id)) return res.status(400).send({ message: 'Invalid id format.' });
  try {
    await prisma.product.delete({ where: { id } });
    res.sendStatus(204);
  } catch {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
}));


// Article(자유게시판) API
app.use('/articles', articleRouter);
// Comment(댓글) API
app.use('/comments', commentRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));

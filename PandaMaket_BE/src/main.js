import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(path.resolve(), '.env') });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { ProductRouter } from './routers/ProductRouter.js';

mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', ProductRouter);

app.listen(process.env.HTTP_PORT || 3000, () => console.log('Server started'));

import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(path.resolve(), '.env') });

import mongoose from 'mongoose';
import { seedData } from './seedData.js';

import { ProductRepository } from '../src/repository/ProductRepository.js';

async function seed() {
    mongoose.connect(process.env.MONGO_URL);

    await ProductRepository.createCollection();
    await ProductRepository.deleteMany({});
    await ProductRepository.insertMany(seedData);

    mongoose.disconnect();
}

seed();

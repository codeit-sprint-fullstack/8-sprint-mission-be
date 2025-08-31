import express from 'express';
import { assert, create } from 'superstruct';

import { asyncErrorHandler } from './utils/asyncErrorHandler.js';
import { ExceptionMessage } from '../constant/ExceptionMessage.js';
import { NotFoundException } from '../exceptions/NotFoundException.js';

import { ProductRepository } from '../repository/ProductRepository.js';
import { Product } from '../models/Product.js';

import { MongoObjectIdStruct } from './structs/product/MongoObjectIdStruct.js';
import { CreateProductRequestStruct } from './structs/product/CreateProductRequestStruct.js';
import { UpdateProductRequestStruct } from './structs/product/UpdateProductRequestStruct.js';
import { GetProductListRequestStruct } from './structs/product/GetProductListRequestStruct.js';

export const ProductRouter = express.Router();

// 상품 등록 api
ProductRouter.post(
    '/',
    asyncErrorHandler(async (req, res) => {
        const { name, description, price, tags, images } = create(
            req.body,
            CreateProductRequestStruct,
        );

        const productEntity = await ProductRepository.create({
            name,
            description,
            price,
            tags,
            images,
        });

        const product = new Product(productEntity);

        return res.status(201).send({
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            tags: product.getTags(),
            images: product.getImages(),
            createdAt: product.getCreatedAt(),
            updatedAt: product.getUpdatedAt(),
        });
    }),
);

// 상품 조회 api
ProductRouter.get(
    '/:productId',
    asyncErrorHandler(async (req, res) => {
        assert(req.params, MongoObjectIdStruct);

        const { productId } = req.params;

        const productEntity = await ProductRepository.findOne({
            _id: productId,
        });

        if (!productEntity) {
            throw new NotFoundException(ExceptionMessage.PRODUCT_NOT_FOUND);
        }

        const product = new Product(productEntity);

        return res.send({
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            tags: product.getTags(),
            images: product.getImages(),
            createdAt: product.getCreatedAt(),
            updatedAt: product.getUpdatedAt(),
        });
    }),
);

// 상품 수정 api
ProductRouter.patch(
    '/:productId',
    asyncErrorHandler(async (req, res) => {
        assert(req.params, MongoObjectIdStruct);

        const { productId } = req.params;
        const { name, description, price, tags, images } = create(
            req.body,
            UpdateProductRequestStruct,
        );

        const productEntity = await ProductRepository.findOne({
            _id: productId,
        });

        if (!productEntity) {
            throw new NotFoundException(ExceptionMessage.PRODUCT_NOT_FOUND);
        }

        const product = new Product(productEntity);

        if (name) {
            product.setName(name);
        }
        if (description) {
            product.setDescription(description);
        }
        if (price) {
            product.setPrice(price);
        }
        if (tags) {
            product.setTags(tags);
        }
        if (images) {
            product.setImages(images);
        }

        const updateResult = await ProductRepository.updateOne(
            {
                _id: productId,
            },
            {
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                tags: product.getTags(),
                images: product.getImages(),
                updatedAt: product.getUpdatedAt(),
            },
        );

        if (updateResult.matchedCount !== 1) {
            throw new NotFoundException(ExceptionMessage.PRODUCT_NOT_FOUND);
        }

        return res.send({
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            tags: product.getTags(),
            images: product.getImages(),
            createdAt: product.getCreatedAt(),
            updatedAt: product.getUpdatedAt(),
        });
    }),
);

// 상품 삭제 api
ProductRouter.delete(
    '/:productId',
    asyncErrorHandler(async (req, res) => {
        assert(req.params, MongoObjectIdStruct);

        const { productId } = req.params;

        const deleteResult = await ProductRepository.deleteOne({
            _id: productId,
        });

        if (deleteResult.deletedCount !== 1) {
            throw new NotFoundException(ExceptionMessage.PRODUCT_NOT_FOUND);
        }

        return res.status(204).send();
    }),
);

// 상품 목록 조회 api
ProductRouter.get(
    '/',
    asyncErrorHandler(async (req, res) => {
        const { skip, take, orderBy, word } = create(req.query, GetProductListRequestStruct);

        const whereClause = word
            ? {
                  $or: [
                      {
                          name: {
                              $regex: word,
                              $options: 'i',
                          },
                      },
                      {
                          description: {
                              $regex: word,
                              $options: 'i',
                          },
                      },
                  ],
              }
            : undefined;

        const orderByClause = orderBy === 'recent' ? { createdAt: -1 } : undefined;

        const matchedProductCount = await ProductRepository.countDocuments(whereClause);
        const productEntities = await ProductRepository.find(whereClause)
            .sort(orderByClause)
            .skip(skip)
            .limit(take);

        const products = productEntities.map((productEntity) => new Product(productEntity));

        return res.send({
            count: matchedProductCount,
            data: products.slice(0, take).map((product) => ({
                id: product.getId(),
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                tags: product.getTags(),
                images: product.getImages(),
                createdAt: product.getCreatedAt(),
                updatedAt: product.getUpdatedAt(),
            })),
        });
    }),
);

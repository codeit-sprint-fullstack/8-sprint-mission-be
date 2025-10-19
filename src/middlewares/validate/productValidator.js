import { body, param } from 'express-validator';

export const createProductValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
];

export const updateProductValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
];

export const productIdValidator = [param('productId').isUUID().withMessage('Invalid product ID')];

import { body, param } from 'express-validator';

export const createProductValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').notEmpty().withMessage('Price is required'),
  body('tags').notEmpty().withMessage('Tags is required'),
];

export const updateProductValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').notEmpty().withMessage('Price is required'),
  body('tags').notEmpty().withMessage('Tags is required'),
];

export const productIdValidator = [param('id').isUUID().withMessage('Invalid product ID')];

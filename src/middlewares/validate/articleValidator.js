import { body, param } from 'express-validator';

export const createArticleValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
];

export const updateArticleValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
];

export const articleIdValidator = [param('id').isUUID().withMessage('Invalid article ID')];

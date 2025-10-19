import { body, param } from 'express-validator';

export const createCommentValidator = [
  body('content').notEmpty().withMessage('Content is required'),
];

export const updateCommentValidator = [
  body('content').notEmpty().withMessage('Content is required'),
];

export const commentIdValidator = [param('commentId').isUUID().withMessage('Invalid comment id')];

export const articleIdValidator = [param('articleId').isUUID().withMessage('Invalid article id')];

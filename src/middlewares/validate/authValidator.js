import { body } from 'express-validator';

export const signupValidator = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('nickname').notEmpty().withMessage('Nickname is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const signinValidator = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

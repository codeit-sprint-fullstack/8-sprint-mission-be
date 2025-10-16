import { hashPassword } from '../utils/hash.js';
import { createUser, findUserByEmail } from '../repositories/userRepository.js';

export const signup = async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;

    if (!email || !nickname || !password) {
      const error = new Error('Email, nickname, and password are required');
      error.status = 400;
      throw error;
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      const error = new Error('Email already exists');
      error.status = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({ email, nickname, encryptedPassword: hashedPassword });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

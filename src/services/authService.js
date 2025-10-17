import { findUserByEmail } from '../repositories/userRepository.js';
import { verifyPassword } from '../utils/hash.js';
import { filterSensitiveUserData } from '../utils/filter.js';

export const verifyUser = async (email, password) => {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const isValidPassword = await verifyPassword(password, user.encryptedPassword);

    if (!isValidPassword) {
      const error = new Error('Invalid password');
      error.status = 401;
      throw error;
    }

    return filterSensitiveUserData(user);
  } catch (error) {
    throw error;
  }
};

import jwt from 'jsonwebtoken';

export const createAccessToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const createRefreshToken = (userId) => {
  const payload = { userId };
  const options = { expiresIn: '30d' };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

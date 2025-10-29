import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 인증 필수 미들웨어
export const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Access token expired',
        code: 'TOKEN_EXPIRED',
      });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// 인증 선택 미들웨어 (토큰이 있으면 검증, 없어도 통과)
export const optionalAuthenticate = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      // 토큰이 유효하지 않아도 에러를 발생시키지 않음
      req.user = null;
    }
  }

  next();
};

// 리소스 소유자 확인 미들웨어
export const authorizeOwner = getResourceOwner => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const resourceOwnerId = await getResourceOwner(req);

      if (!resourceOwnerId) {
        return res.status(404).json({ message: 'Resource not found' });
      }

      if (resourceOwnerId !== userId) {
        return res
          .status(403)
          .json({ message: 'Forbidden: You do not have permission' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

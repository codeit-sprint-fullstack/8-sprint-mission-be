import isUUID from 'is-uuid';

export const validateUUID = (req, res, next) => {
  const { id } = req.params;
  if (!isUUID.v4(id)) {
    return res.status(400).json({ message: 'Invalid id format.' });
  }
  next();
};

export const validateParamUUID = paramName => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!isUUID.v4(id)) {
      return res.status(400).json({ message: 'Invalid id format.' });
    }
    next();
  };
};

export const validateArticleData = (req, res, next) => {
  const { userId, title, content } = req.body;
  if (!userId || !title || !content) {
    return res.status(400).json({ message: 'userId, title, content required' });
  }
  next();
};

export const validateCommentData = (req, res, next) => {
  const { userId, content } = req.body;
  if (!userId || !content) {
    return res.status(400).json({ message: 'userId, content required' });
  }
  next();
};

export const validateUser = (req, res, next) => {
  const { email, nickname, password } = req.body;
  if (!email || !nickname || !password) {
    return res
      .status(400)
      .json({ message: 'email, nickname, password required' });
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next();
};

export const validateProduct = (req, res, next) => {
  const { userId, name, price } = req.body;
  if (!userId || !name || price === undefined) {
    return res.status(400).json({ message: 'userId, name, price required' });
  }

  // 가격 검증
  if (isNaN(price) || price < 0) {
    return res.status(400).json({ message: 'Invalid price' });
  }

  next();
};

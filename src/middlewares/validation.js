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
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'title, content required' });
  }
  next();
};

export const validateCommentData = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: 'content required' });
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

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email, password required' });
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next();
};

export const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: 'name, price required' });
  }

  // 가격 검증 및 변환
  const numPrice = Number(price);
  if (isNaN(numPrice) || numPrice < 0) {
    return res.status(400).json({ message: 'Invalid price' });
  }

  // 숫자로 변환된 price를 req.body에 다시 할당
  req.body.price = numPrice;

  next();
};

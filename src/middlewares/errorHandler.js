export const asyncHandler = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Prisma 에러 처리
  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Not found' });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({ message: 'Duplicate entry' });
  }

  if (err.code === 'P2003') {
    return res.status(400).json({ message: 'Foreign key constraint failed' });
  }

  if (err.code === 'P2023') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // 기본 에러 처리
  res.status(500).json({ message: 'Internal server error' });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

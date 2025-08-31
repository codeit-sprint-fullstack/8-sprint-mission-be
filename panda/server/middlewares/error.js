const notFound = (req, res, next) => {
  res.status(404).json({ code: 'NOT_FOUND', message: 'Route not found' });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    code: err.code || 'INTERNAL_ERROR',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = { notFound, errorHandler };
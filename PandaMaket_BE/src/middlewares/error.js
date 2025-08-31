export function notFound(req, res, next) {
    res.status(404).json({ message: 'Not Found' });
}

export function errorHandler(err, req, res, next) {
    console.error(err);

    // Prisma known errors or validation
    if (err.name === 'PrismaClientKnownRequestError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.status && err.message) {
        return res.status(err.status).json({ message: err.message });
    }

    res.status(500).json({ message: 'Internal Server Error' });
}

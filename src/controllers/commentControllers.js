import prisma from '../middlewares/prisma.js';

export const getCommentByArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cursor = req.query.cursor;
    const limit = parseInt(req.query.limit) || 10;
    const direction = req.query.direction || 'next'; // 'next' or 'prev'

    const validLimit = Math.min(Math.max(1, limit), 50); // 1-50 사이로 제한

    let whereCondition = { articleId: id };
    let orderBy = { createdAt: 'desc' };

    // cursor가 있는 경우
    if (cursor) {
      const cursorDate = new Date(cursor);
      if (direction === 'prev') {
        // 이전 페이지: cursor보다 이전 데이터
        whereCondition.createdAt = { lt: cursorDate };
        orderBy = { createdAt: 'desc' };
      } else {
        // 다음 페이지: cursor보다 이후 데이터
        whereCondition.createdAt = { gt: cursorDate };
        orderBy = { createdAt: 'asc' };
      }
    }

    const comments = await prisma.comment.findMany({
      where: whereCondition,
      take: validLimit + 1, // 한 개 더 가져와서 hasNextPage 확인
      orderBy,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // hasNextPage 확인
    const hasNextPage = comments.length > validLimit;
    if (hasNextPage) {
      comments.pop(); // 마지막 요소 제거
    }

    // direction이 'prev'인 경우 결과를 다시 역순으로 정렬
    if (direction === 'prev') {
      comments.reverse();
    }

    // cursor 정보 계산
    const nextCursor =
      comments.length > 0 ? comments[comments.length - 1].createdAt.toISOString() : null;
    const prevCursor = comments.length > 0 ? comments[0].createdAt.toISOString() : null;

    res.status(200).json({
      success: true,
      data: comments,
      pagination: {
        hasNextPage,
        hasPrevPage: !!cursor,
        nextCursor,
        prevCursor,
        limit: validLimit,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentByProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cursor = req.query.cursor;
    const limit = parseInt(req.query.limit) || 10;
    const direction = req.query.direction || 'next'; // 'next' or 'prev'

    const validLimit = Math.min(Math.max(1, limit), 50); // 1-50 사이로 제한

    let whereCondition = { productId: id };
    let orderBy = { createdAt: 'desc' };

    if (cursor) {
      const cursorDate = new Date(cursor);
      if (direction === 'prev') {
        whereCondition.createdAt = { lt: cursorDate };
        orderBy = { createdAt: 'desc' };
      } else {
        whereCondition.createdAt = { gt: cursorDate };
        orderBy = { createdAt: 'asc' };
      }
    }

    const comments = await prisma.comment.findMany({
      where: whereCondition,
      take: validLimit + 1, // 한 개 더 가져와서 hasNextPage 확인
      orderBy,
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const hasNextPage = comments.length > validLimit;
    if (hasNextPage) {
      comments.pop(); // 마지막 요소 제거
    }

    if (direction === 'prev') {
      comments.reverse();
    }

    const nextCursor =
      comments.length > 0 ? comments[comments.length - 1].createdAt.toISOString() : null;
    const prevCursor = comments.length > 0 ? comments[0].createdAt.toISOString() : null;

    res.status(200).json({
      success: true,
      data: comments,
      pagination: {
        hasNextPage,
        hasPrevPage: !!cursor,
        nextCursor,
        prevCursor,
        limit: validLimit,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

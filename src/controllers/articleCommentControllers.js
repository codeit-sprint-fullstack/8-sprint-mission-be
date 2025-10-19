import * as commentRepository from '../repositories/commentRepository.js';

export const createArticleComment = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    const ownerId = req.user.id;

    const comment = await commentRepository.createCommentByArticle(articleId, content, ownerId);
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const updateArticleComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const ownerId = req.user.id;

    const comment = await commentRepository.updateCommentByArticle(commentId, content, ownerId);
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const deleteArticleComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const ownerId = req.user.id;

    await commentRepository.deleteCommentByArticle(commentId);
    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

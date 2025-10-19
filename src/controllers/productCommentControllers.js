import * as commentRepository from '../repositories/commentRepository.js';

export const createProductComment = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { content } = req.body;
    const ownerId = req.user.id;

    const comment = await commentRepository.createCommentByProduct(productId, content, ownerId);
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const updateProductComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const ownerId = req.user.id;

    const comment = await commentRepository.updateCommentByProduct(commentId, content, ownerId);
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const deleteProductComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const ownerId = req.user.id;

    await commentRepository.deleteCommentByProduct(commentId);
    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

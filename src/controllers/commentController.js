import { commentRepository } from '../repositories/commentRepository.js';

export const commentController = {
  // 자유게시판 댓글 등록
  async createArticleComment(req, res) {
    const userId = req.user.id; // 인증 미들웨어에서 설정된 user 정보
    const { content } = req.body;
    const { articleId } = req.params;

    const comment = await commentRepository.createForArticle({
      userId,
      content,
      articleId,
    });
    res.status(201).json(comment);
  },

  // 중고마켓 댓글 등록
  async createProductComment(req, res) {
    const userId = req.user.id; // 인증 미들웨어에서 설정된 user 정보
    const { content } = req.body;
    const { productId } = req.params;

    const comment = await commentRepository.createForProduct({
      userId,
      content,
      productId,
    });
    res.status(201).json(comment);
  },

  // 댓글 수정
  async updateComment(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await commentRepository.update(id, { content });
    res.json(comment);
  },

  // 댓글 삭제
  async deleteComment(req, res) {
    const { id } = req.params;
    await commentRepository.delete(id);
    res.sendStatus(204);
  },

  // 자유게시판 댓글 목록 조회
  async getArticleComments(req, res) {
    const { articleId } = req.params;
    const { cursor, limit = 10 } = req.query;

    const comments = await commentRepository.findManyByArticle({
      articleId,
      cursor: cursor ? String(cursor) : undefined,
      take: Number(limit),
    });

    res.json(comments);
  },

  // 중고마켓 댓글 목록 조회
  async getProductComments(req, res) {
    const { productId } = req.params;
    const { cursor, limit = 10 } = req.query;

    const comments = await commentRepository.findManyByProduct({
      productId,
      cursor: cursor ? String(cursor) : undefined,
      take: Number(limit),
    });

    res.json(comments);
  },
};

const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// 댓글 목록 조회 (cursor 방식 페이지네이션)
router.get("/", async (req, res) => {
  try {
    const { cursor, limit = 10, productId, articleId } = req.query;
    const limitNum = parseInt(limit);
    
    // productId 또는 articleId 중 하나는 필수
    if (!productId && !articleId) {
      return res.status(400).json({ error: "productId 또는 articleId가 필요합니다." });
    }
    
    let whereCondition = {};
    if (productId) {
      whereCondition.productId = productId;
    }
    if (articleId) {
      whereCondition.articleId = articleId;
    }
    
    // cursor가 있으면 해당 cursor 이후의 데이터 조회
    if (cursor) {
      whereCondition.id = { [require('sequelize').Op.gt]: cursor };
    }
    
    const comments = await Comment.findAll({
      where: whereCondition,
      order: [['id', 'ASC']], // cursor 방식은 보통 id 기준 오름차순
      limit: limitNum + 1, // 다음 페이지 존재 여부 확인을 위해 +1
      attributes: ['id', 'content', 'createdAt']
    });
    
    // 다음 페이지 존재 여부 확인
    const hasNextPage = comments.length > limitNum;
    const nextCursor = hasNextPage ? comments[limitNum - 1].id : null;
    
    // 실제 반환할 데이터 (마지막 +1개 제거)
    const result = hasNextPage ? comments.slice(0, limitNum) : comments;
    
    res.status(200).json({
      list: result,
      nextCursor: nextCursor,
      hasNextPage: hasNextPage
    });
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 댓글 등록
router.post("/", async (req, res) => {
  try {
    const { content, productId, articleId } = req.body;
    
    // 필수 필드 검증
    if (!content) {
      return res.status(400).json({ error: "댓글 내용을 입력해주세요." });
    }
    
    // productId 또는 articleId 중 하나는 필수
    if (!productId && !articleId) {
      return res.status(400).json({ error: "productId 또는 articleId가 필요합니다." });
    }
    
    const comment = await Comment.create({
      content,
      productId: productId || null,
      articleId: articleId || null
    });
    
    res.status(201).json({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt
    });
  } catch (error) {
    console.error("댓글 등록 실패:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: "입력 데이터가 올바르지 않습니다." });
    }
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 댓글 수정
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    }
    
    await comment.update({ content });
    
    res.status(200).json({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    });
  } catch (error) {
    console.error("댓글 수정 실패:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: "입력 데이터가 올바르지 않습니다." });
    }
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 댓글 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ error: "댓글을 찾을 수 없습니다." });
    }
    
    await comment.destroy();
    
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;

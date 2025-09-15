const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');
const Article = require("../models/article");

// 게시글 목록 조회 (페이지네이션, 검색, 정렬)
router.get("/", async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword = "", orderBy = "recent" } = req.query;
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    // 검색 조건
    let whereCondition = {};
    if (keyword) {
      whereCondition = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { content: { [Op.iLike]: `%${keyword}%` } }
        ]
      };
    }

    // 정렬 조건
    let orderCondition = [];
    if (orderBy === "recent") {
      orderCondition = [['createdAt', 'DESC']];
    }

    // 게시글 조회
    const articles = await Article.findAndCountAll({
      where: whereCondition,
      order: orderCondition,
      limit: limit,
      offset: offset,
      attributes: ['id', 'title', 'content', 'createdAt']
    });

    res.status(200).json({
      list: articles.rows,
      totalCount: articles.count,
      page: parseInt(page),
      pageSize: limit,
      totalPages: Math.ceil(articles.count / limit)
    });
  } catch (error) {
    console.error("게시글 목록 조회 실패:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 게시글 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const article = await Article.findByPk(id, {
      attributes: ['id', 'title', 'content', 'createdAt']
    });
    
    if (!article) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    
    res.status(200).json(article);
  } catch (error) {
    console.error("게시글 상세 조회 실패:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 게시글 등록
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // 필수 필드 검증
    if (!title || !content) {
      return res.status(400).json({ error: "제목과 내용을 입력해주세요." });
    }
    
    const article = await Article.create({
      title,
      content
    });
    
    res.status(201).json({
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt
    });
  } catch (error) {
    console.error("게시글 등록 실패:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: "입력 데이터가 올바르지 않습니다." });
    }
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 게시글 수정
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    
    // 수정할 필드만 업데이트
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    
    await article.update(updateData);
    
    res.status(200).json({
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt
    });
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: "입력 데이터가 올바르지 않습니다." });
    }
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const article = await Article.findByPk(id);
    
    if (!article) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    
    await article.destroy();
    
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;

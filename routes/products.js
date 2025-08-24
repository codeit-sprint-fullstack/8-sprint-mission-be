const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

//상품 등록
router.post('/', async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'name과 price는 필수 입력값입니다.' });
    }

    const product = new Product({ name, description, price, tags });
    const saved = await product.save();

    res.status(201).json(saved); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '상품 등록 실패', details: err.message });
  }
});

//상품 목록 조회 (페이지네이션 + 검색 + 정렬)
router.get('/', async (req, res) => {
  try {
    let { offset = 0, limit = 10, q = '', sort } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);

    const query = {};
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    const sortOption = sort === 'recent' ? { createdAt: -1 } : {};

    const total = await Product.countDocuments(query);
    const items = await Product.find(query)
      .sort(sortOption)
      .skip(offset)
      .limit(limit)
      .select('_id name price createdAt');

    res.json({ total, offset, limit, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '상품 목록 조회 실패', details: err.message });
  }
});

//상품 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .select('_id name description price tags createdAt');
    if (!product) {
      return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '상품 상세 조회 실패', details: err.message });
  }
});

//상품 수정 (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: '수정할 상품을 찾을 수 없습니다.' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: '상품 수정 실패', details: err.message });
  }
});

//상품 삭제
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: '삭제할 상품을 찾을 수 없습니다.' });
    }
    res.status(204).send(); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '상품 삭제 실패', details: err.message });
  }
});

module.exports = router;

const router = require('express').Router();
const article = require('../controllers/articleController');
const comment = require('../controllers/commentController');

router.post('/', article.create);
router.get('/', article.list);
router.get('/:id', article.getById);
router.patch('/:id', article.update);
router.delete('/:id', article.remove);

router.post('/:articleId/comments', comment.createForArticle);
router.get('/:articleId/comments', comment.listForArticle);

module.exports = router;
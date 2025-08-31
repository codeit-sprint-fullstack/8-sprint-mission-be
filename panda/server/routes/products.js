const router = require('express').Router();
const product = require('../controllers/productController');
const comment = require('../controllers/commentController');

router.post('/', product.create);
router.get('/', product.list);
router.get('/:id', product.getById);
router.delete('/:id', product.remove);

router.post('/:productId/comments', comment.createForProduct);
router.get('/:productId/comments', comment.listForProduct);

module.exports = router;
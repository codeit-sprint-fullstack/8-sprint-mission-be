const router = require('express').Router();
const comment = require('../controllers/commentController');

router.patch('/:id', comment.patch);
router.delete('/:id', comment.remove);

module.exports = router;
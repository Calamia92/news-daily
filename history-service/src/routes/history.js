const express = require('express');
const router = express.Router();
const controller = require('../controllers/historyController');

router.post('/', controller.add);
router.get('/', controller.getAll);
router.delete('/', controller.deleteAll);
router.delete('/:id', controller.deleteOne);

module.exports = router;

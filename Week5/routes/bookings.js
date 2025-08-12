const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.get('/', bookingsController.getAll);
router.post('/', bookingsController.create);
router.get('/:id', bookingsController.getById);
router.delete('/:id', bookingsController.remove);

module.exports = router;

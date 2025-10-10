// this file helps our routes url
const router = require('express').Router();
const userRouter = require('./users');
const ClothingItem = require('./ClothingItems');

router.use('/users', userRouter);
router.use('/items', ClothingItem);

module.exports = router;

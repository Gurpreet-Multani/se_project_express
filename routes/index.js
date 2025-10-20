// this file helps our routes url
const router = require('express').Router();
const userRouter = require('./users');
const { login, createUser } = require('../controllers/UserControllers');
const clothingItemRouter = require('./ClothingItems');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', userRouter);
router.use('/items', clothingItemRouter);

module.exports = router;

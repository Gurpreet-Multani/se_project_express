// routes for ClothingItems
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createItem,
  getItems,
  deleteitem,
  likeItem,
  dislikeItem,
} = require('../controllers/ClothingItemsControllers');

// make a route for clothing item called item and by its id

// clothing item
router.get('/', getItems);
router.post('/', auth, createItem);
router.delete('/:itemId', auth, deleteitem);

// likes
router.put('/:itemId/likes', auth, likeItem);
router.delete('/:itemId/likes', auth, dislikeItem);

module.exports = router;

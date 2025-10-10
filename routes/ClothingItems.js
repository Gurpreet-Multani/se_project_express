// routes for ClothingItems
const router = require('express').Router();
const {
  createItem,
  getItems,
  deleteitem,
  likeItem,
  dislikeItem,
} = require('../controllers/ClothingItemsControllers');

// make a route for clothing item called item and by its id

// clothing item
router.post('/', createItem);
router.get('/', getItems);
router.delete('/:itemId', deleteitem);

// likes
router.put('/:itemId/likes', likeItem);
router.delete('/:itemId/likes', dislikeItem);

module.exports = router;

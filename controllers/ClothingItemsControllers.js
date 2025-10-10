const ClothingItem = require("../models/ClothingItem");

//Post /item
const createItem = (req, res) => {
  //body here
  //owners value is a ref to user id

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      //code here
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      //code here
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }

      console.log(err);
      res.status(500).send({ message: "Error from createItem" });
    });
};

//Get /item
const getItems = (req, res) => {
  //code here
  //gets all/finds all doucments
  ClothingItem.find({})
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      //code here
      res.status(500).send({ message: "Error from getItems" });
    });
};

// Delete /items/:itemId
const deleteitem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      // If no item is found with that ID, return a 404 error
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      // Otherwise, send back the deleted item's data
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      // Handle invalid ID format errors
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid ID format" });
      }

      console.log(err);
      // Handle other potential server errors
      res.status(500).send({ message: "An error has occurred on the server" });
    });
};

//PUT /items/:itemId/likes — like an item
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    //$addToSet adds a value to array
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (item === null) {
        return res.status(404).send({ message: "item does not exist" });
      }

      res.send(item);
      console.log(item);
    })
    .catch((err) => {
      // handle errors here
      if (err.name === "CastError") {
        return res.status(400).send({ message: err.message });
      }

      console.log(err);
      res.status(500).send({ message: "An error has occurred on the server" });
    });
};

//DELETE /items/:itemId/likes — unlike an item
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    // $pull removes user ID from array
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      // Otherwise, send back the deleted item's data

      res.send(item);
    })
    .catch((err) => {
      // handle errors here
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ message: "An error has occurred on the server" });
      }

      console.log(err);
      res
        .status(500)
        .send({ message: "An error has occurred on the dislikeItem" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteitem,
  likeItem,
  dislikeItem,
};

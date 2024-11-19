const clothingItem = require("../models/clothingItem");
const {
  badRequestError,
  notFoundError,
  forbiddenError,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log("POST clothingItem in controller");
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new badRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res) => {
  console.log("GET clothingItems in controller");
  clothingItem
    .find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        next(new badRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const getItem = (req, res) => {
  console.log("GET clothingItem by ID in controller");
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new notFoundError("Clothing item not found"));
      } else if (err.name === "CastError") {
        next(new badRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new notFoundError("Clothing item not found"));
      } else if (err.name === "CastError") {
        next(new badRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new notFoundError("Clothing item not found"));
      } else if (err.name === "CastError") {
        next(new badRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res) => {
  console.log("DELETE clothingItems by ID in controller");
  clothingItem
    .findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        next(new forbiddenError("You can delete only your items"));
      }
      return clothingItem
        .findByIdAndRemove(req.params.itemId)
        .then(() => res.status(200).send({ message: "Clothing item deleted" }))
        .catch((err) => {
          console.error(err);
          if (err.name === "DocumentNotFoundError") {
            next(new notFoundError("Clothing item not found"));
          } else if (err.name === "CastError") {
            next(new badRequestError("Invalid data"));
          } else {
            next(err);
          }
        });
    });
};

module.exports = {
  getItems,
  createItem,
  getItem,
  deleteItem,
  likeItem,
  dislikeItem,
};

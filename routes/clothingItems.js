const router = require("express").Router();

const { get } = require("mongoose");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.get("/:itemId", getItem);

router.post("/", createItem);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

router.delete("/:itemId", deleteItem);

module.exports = router;

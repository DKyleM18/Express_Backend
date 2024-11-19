const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/items", getItems);

// router.use(auth);

router.get("/items/:itemId", getItem);

router.post("/items", createItem);

router.put("/items/:itemId/likes", likeItem);

router.delete("/items/:itemId/likes", dislikeItem);

router.delete("/items/:itemId", deleteItem);

module.exports = router;

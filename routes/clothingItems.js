const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.use(auth);

router.get("/:itemId", getItem);

router.post("/", createItem);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

router.delete("/:itemId", deleteItem);

module.exports = router;

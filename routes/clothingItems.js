const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateId, validateCardBody } = require("../middlewares/validation");
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

router.get("/:itemId", validateId, getItem);

router.post("/", validateCardBody, createItem);

router.put("/:itemId/likes", validateId, likeItem);

router.delete("/:itemId/likes", validateId, dislikeItem);

router.delete("/:itemId", validateId, deleteItem);

module.exports = router;

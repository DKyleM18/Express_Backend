const express = require("express");
const {
  getNewsCards,
  createNewsCard,
  deleteNewsCard,
} = require("../controllers/newsCards");

const router = express.Router();

router.get("/", getNewsCards);
router.post("/", createNewsCard);
router.delete("/:newsCardId", deleteNewsCard);

module.exports = router;

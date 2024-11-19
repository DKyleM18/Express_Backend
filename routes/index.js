const router = require("express").Router();
const { notFoundError } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/", clothingItemRouter);
router.use("/", userRouter);
router.use((req, res, next) => {
  next(new notFoundError("Not found"));
});

module.exports = router;

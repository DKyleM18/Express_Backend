const router = require("express").Router();
const { notFoundError } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/items", clothingItemRouter);

router.use("/users", userRouter);

router.use("*", (req, res) => {
  return res.status(notFoundError).send({ message: "Not found" });
});

module.exports = router;

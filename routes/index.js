const router = require("express").Router();
const { notFoundError } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

router.use((req, res) =>
  res.status(notFoundError).send({ message: "Route not found" })
);

module.exports = router;

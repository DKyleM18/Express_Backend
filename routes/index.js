const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/clothingItems", clothingItemRouter);

router.use("/users", userRouter);

module.exports = router;

const router = require("express").Router();
const NotFoundError = require("../errors/not-found-error");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);

router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

router.use((next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;

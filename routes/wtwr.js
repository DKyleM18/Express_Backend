const router = require("express").Router();
const NotFoundError = require("../errors/not-found-error");
const {
  validateLogin,
  validateWearUserBody,
} = require("../middlewares/validation");
const clothingItemRouter = require("./clothingItems");
const wearUserRouter = require("./wearUsers");
const { login, createUser } = require("../controllers/users");

router.post("/signin", validateLogin, login);
router.post("/signup", validateWearUserBody, createUser);

router.use("/items", clothingItemRouter);
router.use("/users", wearUserRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;

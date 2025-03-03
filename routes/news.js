const router = require("express").Router();
const NotFoundError = require("../errors/not-found-error");
const {
  validateLogin,
  validateNewsUserBody,
} = require("../middlewares/validation");
const newsUserRouter = require("./newsUsers");
const { login, createNewsUser } = require("../controllers/newsUsers");

router.post("/signin", validateLogin, login);
router.post("/signup", validateNewsUserBody, createNewsUser);

router.use("/users", newsUserRouter);

router.use((next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;

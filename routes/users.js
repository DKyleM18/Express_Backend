const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

// router.use(auth);

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateUser);

module.exports = router;

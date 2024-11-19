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

router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;

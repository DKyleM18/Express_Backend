const router = require("express").Router();
const { getCurrentUser, patchCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdate, patchCurrentUser);

module.exports = router;

const router = require("express").Router();
const NotFoundError = require("../errors/not-found-error");

router.use((next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;

const router = require("express").Router();
const wtwrRouter = require("./wtwr");
const newsrouter = require("./news");

router.use("/wtwr", wtwrRouter);
router.use("/news", newsrouter);

module.exports = router;

const router = require("express").Router();

router.get("/", () => console.log("GET clothingItems"));

router.get("/:id", () => console.log("GET clothingItems by ID"));

router.post("/", () => console.log("POST clothingItems"));

module.exports = router;

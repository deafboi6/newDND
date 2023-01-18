const router = require("express").Router();
const userRoutes = require("./userRoutes");
const heroRoutes = require("./heroRoutes");

router.use("/users", userRoutes);
router.use("/heroes", heroRoutes);

module.exports = router;

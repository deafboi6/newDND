const router = require("express").Router();
const userRoutes = require("./userRoutes");
const heroRoutes = require("./heroRoutes");
const adventureRoutes = require("./adventureRoutes");

router.use("/users", userRoutes);
router.use("/heroes", heroRoutes);
router.use("/adventure", adventureRoutes);

module.exports = router;

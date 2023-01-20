const router = require("express").Router();
const userRoutes = require("./userRoutes");
const heroRoutes = require("./heroRoutes");
const monsterRoutes = require("./monster_routes")
const adventureRoutes = require("./adventureRoutes");

router.use("/users", userRoutes);
router.use("/heroes", heroRoutes);
router.use("/monster", monsterRoutes);
router.use("/adventure", adventureRoutes);

module.exports = router;

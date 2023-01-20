const router = require("express").Router();
const userRoutes = require("./userRoutes");
const heroRoutes = require("./heroRoutes");
const monsterRoutes = require("./monster_routes")

router.use("/users", userRoutes);
router.use("/heroes", heroRoutes);
router.use("/monster", monsterRoutes);

module.exports = router;

const router = require("express").Router();
const { Hero } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const dbHeroData = await Hero.create({
      name: req.body.name,
      attack: req.body.attack,
      hitPoints: req.body.hitPoints,
      mana: req.body.mana,
      user_id: req.session.user_id,
    });
    console.log(dbHeroData);
    req.session.save(() => {
      res.status(200).json(dbHeroData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

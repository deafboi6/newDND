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

// gets hero by id. this is called when the game starts
router.get("/:id", async (req, res) => {
  try {
    const heroData = await Hero.findByPk(req.params.id);

    const hero = heroData.get({ plain: true });

    console.log("HERO: ", hero);

    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json(err);
  }
});

//deletes hero
router.delete("/:id", async (req, res) => {
  try {
    await Hero.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json("hero deleted!");
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;

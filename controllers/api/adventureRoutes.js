const router = require("express").Router();
const { Hero, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", async (req, res) => {
  try {
    const heroData = await Hero.findByPk(req.params.id);

    const hero = heroData.get({ plain: true });

    res.render("adventure", {
      hero,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

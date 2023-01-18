const router = require("express").Router();
const { User, Hero } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const heroData = await Hero.findAll({
    where: {
      user_id: req.session.user_id,
    },
  }).catch((err) => {
    res.json(err);
  });

  const heroes = heroData.map((hero) => hero.get({ plain: true }));

  res.render("homepage", {
    heroes,
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/create", withAuth, async (req, res) => {
  res.render("hero-create", { logged_in: true });
});

router.get("/adventure", withAuth, async (req, res) => {
  res.render("adventure", { logged_in: true });
});

module.exports = router;

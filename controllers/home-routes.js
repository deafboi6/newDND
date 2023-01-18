const router = require("express").Router();
const { User, Hero } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/create", withAuth, async (req, res) => {
  res.render("hero-create", { logged_in: true });
});

module.exports = router;

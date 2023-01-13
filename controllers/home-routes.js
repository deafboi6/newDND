const router = require("express").Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;

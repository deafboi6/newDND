const { Hero } = require("../models");

const heroData = [
  {
    name: "Hero1",
    attack: 100,
    hitPoints: 101,
    mana: 102,
    user_id: 1,
  },
  {
    name: "Hero2",
    attack: 102,
    hitPoints: 103,
    mana: 104,
    user_id: 2,
  },
];

const seedHeroes = () => Hero.bulkCreate(heroData);

module.exports = seedHeroes;

const User = require("./User");
const Hero = require("./Hero");
const Monster = require("./Monster");

Hero.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Hero, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Hero, Monster };

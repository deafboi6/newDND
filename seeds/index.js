const sequelize = require("../config/connection");

const seedUsers = require("./user-seeds");
const seedHeroes = require("./hero-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedHeroes();
  console.log("\n----- HEROES SEEDED -----\n");

  process.exit(0);
};

seedAll();

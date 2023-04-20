const { User } = require("../models");

const seedData = [
  {
    username: `TechyMike`,
    password: `12345`,
  },
  {
    username: "TechnoSteve",
    password: `Steve`,
  },
  {
    username: `RobotRandall`,
    password: `Randall`,
  },
  {
    username: `Binary_Britt`,
    password: `Britt`,
  },
];

const seedUsers = () => User.bulkCreate(seedData);

module.exports = seedUsers;

const { User } = require("../Models");

const seedData = [
  {
    user_id: `1`,
    username: `TechyMike`,
    password: `12345`,
  },
  {
    user_id: `2`,
    username: "TechnoSteve",
    password: `Steve`,
  },
  {
    user_id: `3`,
    username: `RobotRandall`,
    password: `Randall`,
  },
  {
    user_id: `4`,
    username: `Binary_Britt`,
    password: `Britt`,
  },
];

const seedUsers = () => User.bulkCreate(seedData);

module.exports = seedUsers;

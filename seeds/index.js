const sequelize = require("../config/config");

const userSeeds = require("./userSeeds");
const postSeeds = require("./postSeeds");
const commentSeeds = require("./commentSeeds");


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userSeeds();

  await postSeeds();

  await commentSeeds();

  process.exit(0);
};

seedDatabase();

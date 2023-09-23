const { Sequelize } = require("sequelize")
let dbSettings = {
  username: 'me',
  database: 'audiostreamingdb',
  password: 'password',
  host: 'localhost',
  dialect: 'postgres'
}
const sequelize = new Sequelize(dbSettings)

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

module.exports = { sq: sequelize, testDbConnection };
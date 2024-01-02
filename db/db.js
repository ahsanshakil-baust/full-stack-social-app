const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "Ahsan075@",
    database: "media",
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = User;

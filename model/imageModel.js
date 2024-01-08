const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./userModel");
const Image = sequelize.define("image", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  driveURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Image, { as: "image", foreignKey: "userId" });
Image.belongsTo(User, { as: "image", foreignKey: "userId" });

module.exports = Image;

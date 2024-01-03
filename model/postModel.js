const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./userModel");

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
});

Post.belongsTo(User);
User.hasMany(Post);

module.exports = Post;

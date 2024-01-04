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

User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.belongsTo(User, { as: "postUser", foreignKey: "userId" });

module.exports = Post;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./userModel");
const Post = require("./postModel");

const Comment = sequelize.define("Comment", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Comment, { as: "userComments", foreignKey: "userId" });
Comment.belongsTo(User, { as: "commentUser", foreignKey: "userId" });

Post.hasMany(Comment, { as: "comments", foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

module.exports = Comment;

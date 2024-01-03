const Post = require("../model/postModel");
const User = require("../model/userModel");

const createPost = async (req, res) => {
  const { title, description, image } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ errMsg: "User not found" });
    }

    const post = await Post.create({
      title,
      description,
      userId,
    });

    res.status(200).json({
      ...post,
      successMsg: "Post Created Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errMsg: "Error creating user",
    });
  }
};

const getAllPostsWithUsers = async (req, res) => {
  try {
    const postsWithUsers = await Post.findAll({ include: User });

    res.status(200).json({
      postsWithUsers,
      successMsg: "Posts with users retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      errMsg: "Error retrieving posts with users",
    });
  }
};

const getUserByPost = async (req, res) => {
  const postId = req.params.postId;

  console.log(postId);

  try {
    const postWithUser = await Post.findByPk(postId, { include: User });

    if (postWithUser) {
      const user = postWithUser.User;
      res.status(200).json({
        user,
        successMsg: "User retrieved successfully",
      });
    } else {
      res.status(404).json({
        errMsg: "Post not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      errMsg: "Error retrieving user",
    });
  }
};

const getPostsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userWithPosts = await User.findByPk(userId, { include: Post });

    if (userWithPosts) {
      const posts = userWithPosts.Posts;
      res.status(200).json({
        posts,
        successMsg: "Posts retrieved successfully",
      });
    } else {
      res.status(404).json({
        errMsg: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      errMsg: "Error retrieving posts",
    });
  }
};

const updatePost = async (req, res) => {};

module.exports = {
  createPost,
  getUserByPost,
  getAllPostsWithUsers,
};

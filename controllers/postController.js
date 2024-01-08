const Comment = require("../model/commentModel");
const Post = require("../model/postModel");
const User = require("../model/userModel");

const createPost = async (req, res) => {
  const { title, description, image } = req.body;
  const userId = req.user.id;

  try {
    const post = await Post.create({
      title,
      description,
      userId,
    });

    res.status(200).json({
      post,
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
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: User,
              as: "commentUser",
            },
          ],
        },
        {
          model: User,
          as: "postUser",
        },
      ],
    });

    res.status(200).json({
      posts,
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

  try {
    const post = await Post.findByPk(postId, {
      include: { model: User, attributes: ["username", "email"] },
      attributes: ["title", "description", "createdAt"],
    });

    if (post) {
      res.status(200).json({
        post,
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
    const userWithPosts = await User.findByPk(userId, { include: ["posts"] });

    if (userWithPosts) {
      const posts = userWithPosts.posts;
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

const updatePost = async (req, res) => {
  const { title, description, image } = req.body;
  const postId = req.params.id;

  const postDetails = await Post.findByPk(postId, {
    include: { model: User, attributes: ["id"] },
    attributes: ["title"],
  });

  if (postDetails.User.id === req.user.id) {
    try {
      const post = await Post.update(
        {
          title,
          description,
        },
        {
          where: {
            id: postId,
          },
        }
      );

      res.status(200).json({
        post,
        successMsg: "Post Updated Successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errMsg: "Error updating post",
      });
    }
  } else {
    res.status(500).json({
      errMsg: "User Not Verified",
    });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  const postDetails = await Post.findByPk(postId, {
    include: { model: User, attributes: ["id"] },
    attributes: ["title"],
  });

  if (postDetails.User.id === req.user.id) {
    try {
      await Post.destroy({
        where: {
          id: postId,
        },
      });

      res.status(200).json({
        successMsg: "Post Deleted Successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errMsg: "Error deleteing post",
      });
    }
  } else {
    res.status(500).json({
      errMsg: "User Not Verified",
    });
  }
};

module.exports = {
  createPost,
  getUserByPost,
  getAllPostsWithUsers,
  getPostsByUser,
  updatePost,
  deletePost,
};

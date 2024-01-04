const Comment = require("../model/commentModel");
const Post = require("../model/postModel");
const User = require("../model/userModel");

const createComment = async (req, res) => {
  const { comment } = req.body;
  const userId = req.user.id;
  const postId = req.params.id;

  if (!userId) return res.status(500).json({ errMsg: "User not LoggedIn..." });

  if (!postId) return res.status(500).json({ errMsg: "Post Not Selected" });

  try {
    const comments = await Comment.create({
      comment,
      userId,
      postId,
    });

    res.status(200).json({
      comments,
      successMsg: "Comment Created Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errMsg: "Error creating user",
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: User }, { model: Post }],
    });

    res.status(200).json({
      comments,
      successMsg: "Comments retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      errMsg: "Error retrieving posts with users",
    });
  }
};

const updateComment = async (req, res) => {
  const { comment } = req.body;
  const commentId = req.params.id;
  const userId = req.user.id;

  if (userId) {
    try {
      const comments = await Comment.update(
        {
          comment,
        },
        {
          where: {
            id: commentId,
          },
        }
      );
      res.status(200).json({
        comments,
        successMsg: "Comment Updated Successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errMsg: "Error updating",
      });
    }
  } else {
    res.status(500).json({
      errMsg: "User not verified",
    });
  }
};

module.exports = {
  createComment,
  getAllComments,
  updateComment,
};

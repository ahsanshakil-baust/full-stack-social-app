const { Router } = require("express");
const { userAuthViaToken } = require("../middlewares/auth");
const {
  createPost,
  getAllPostsWithUsers,
  getUserByPost,
} = require("../controllers/postController");

const router = Router();

router.post("/add", userAuthViaToken, createPost);
router.get("/getAll", getAllPostsWithUsers);
router.get("/:postId", getUserByPost);

module.exports = router;

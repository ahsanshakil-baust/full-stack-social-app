const { Router } = require("express");
const { userAuthViaToken } = require("../middlewares/auth");
const {
  createPost,
  getAllPostsWithUsers,
  getUserByPost,
  getPostsByUser,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = Router();

router.post("/add", userAuthViaToken, createPost);
router.get("/getAll", getAllPostsWithUsers);
router.get("/:postId", getUserByPost);
router.get("/getByUser/:userId", getPostsByUser);
router.patch("/update/:id", userAuthViaToken, updatePost);
router.delete("/delete/:id", userAuthViaToken, deletePost);

module.exports = router;

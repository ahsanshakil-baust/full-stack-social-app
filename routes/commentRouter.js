const { Router } = require("express");
const { userAuthViaToken } = require("../middlewares/auth");
const {
  createComment,
  getAllComments,
  updateComment,
} = require("../controllers/commentController");

const router = Router();

router.post("/add/:id", userAuthViaToken, createComment);
router.get("/getAll", getAllComments);
router.patch("/update/:id", userAuthViaToken, updateComment);

module.exports = router;

const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUser,
  uploadImage,
} = require("../controllers/userController");
const { userAuthViaToken } = require("../middlewares/auth");
const upload = require("../utils/multerUpload");

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/", userAuthViaToken, getUser);
router.patch(
  "/uploadImage",
  userAuthViaToken,
  upload.single("image"),
  uploadImage
);

module.exports = router;

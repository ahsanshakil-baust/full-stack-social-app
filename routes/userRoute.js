const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { userAuthViaToken } = require("../middlewares/auth");

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/", userAuthViaToken, getUser);

module.exports = router;

const { Router } = require("express");
const { createUser } = require("../controllers/userController");

const router = Router();

router.post("/signup", createUser);

module.exports = router;

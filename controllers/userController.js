const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const { createJwt } = require("../utils/jwt");
const { uploadToDrive } = require("./googleDrive");

const createUser = async (req, res) => {
  const { username, email, password, cpassword } = req.body;

  if (password === cpassword) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(200).json({
        user,
        successMsg: "User Created Successfully!",
      });
    } catch (error) {
      res.status(500).json({
        errMsg: "Error creating user",
      });
    }
  } else {
    res.status(400).json({
      errMsg: "Password does not match",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user && user.id) {
    const token = await createJwt(user.get());
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) res.status(200).json({ data: { ...user.get(), token } });
      else res.status(500).json({ errMsg: "Password does not match" });
    });
  } else res.json(500).json({ errMsg: "User not found" });
};

const getUser = (req, res) => {
  if (req.user) {
    res.json({ data: req.user });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedFile = await uploadToDrive(req.file);

    // Store image details in the database
    const image = await Image.create({
      name: req.file.originalname,
      driveURL: uploadedFile.driveURL, // Save Google Drive URL
    });

    return res.status(200).json({ image });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  uploadImage,
};

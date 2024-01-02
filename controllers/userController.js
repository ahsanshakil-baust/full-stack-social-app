const bcrypt = require("bcrypt");
const User = require("../model/userModel");

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
            console.error("Error creating user:", error);
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

module.exports = {
    createUser,
};

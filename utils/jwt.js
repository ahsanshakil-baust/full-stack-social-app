const jwt = require("jsonwebtoken");
const JWT_SECRET = "qweqwejjkqwqwiow90e3qbnwq";

const createJwt = async (user) => {
  const token = jwt.sign(user, JWT_SECRET);
  return token;
};

const verifyJwt = async (token) => {
  const user = jwt.verify(token, JWT_SECRET);
  return user;
};

module.exports = {
  createJwt,
  verifyJwt,
};

const { verifyJwt } = require("../utils/jwt");

const userAuthViaToken = async (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    return res.status(403).json({
      errMsg: "Only for logged in users",
    });
  }

  if (!auth.startsWith("Token")) {
    return res.status(400).json({ errMsg: "AUthorization not working" });
  }

  const token = auth.substr(6);

  try {
    const user = await verifyJwt(token);
    req.user = user;
    return next();
  } catch (err) {
    res.status(403).json({
      errMsg: "Jwt Verification failed",
    });
  }
};

module.exports = {
  userAuthViaToken,
};

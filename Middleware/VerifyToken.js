const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("jwt_auth_token");
  if (!token) return res.status(401).send("Access Denied(No Token)");

  try {
    const verify = jwt.verify(token, "secretkey");
    req.name = verify;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = verifyToken;

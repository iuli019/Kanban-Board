const jwtSecret = "rb_myJwtSecret";
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) {
    res.status(401).json("No token, authorisation denied");
  }
  try {
    // verify token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json("Token is not valid");
  }
}
module.exports = auth;

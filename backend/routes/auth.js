const router = require("express").Router();
let User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const jwtSecret = "rb_myJwtSecret";

router.route("/").post((req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json("Please enter all fields");
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json("User does not exist");
    }

    // validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json("Invalid password");

      jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        jwtSecret,
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: { name: user.name, id: user.id, email: user.email },
          });
        }
      );
    });
  });
});

router.route("/user").get(auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;

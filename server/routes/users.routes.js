const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../middleware/auth.middleware");
const {
  signup,
  login,
  adjustLevel,
  adjustExperience,
  changePassword,
  deleteAccount,
} = require("../models/users.model");

router.get("/validate", auth, (req, res) => {
  return res.send({
    success: true,
    error: null,
    data: { username: req.user.username },
  });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (
    username &&
    password &&
    username.length > 2 &&
    username.length <= 20 &&
    password.length >= 6 &&
    password.length <= 20
  ) {
    return signup(res, username, password);
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided",
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return res.send({success: false, error: err, data: null});
    }
    return res.cookie("jwt", info.token, {secure: true, httpOnly: true }).send({ success: true, error: null, data: user});
  })(req,res);
});

router.patch("/level", (req, res) => {
  const { userId, level } = req.body;
  if (userId && !isNaN(level) && level > -1) {
    return adjustLevel(res, userId, level);
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided",
  });
});

router.patch("/experience", (req, res) => {
  console.log(req.body);
  const { userId, experience } = req.body;
  if (userId && !isNaN(experience)) {
    return adjustExperience(res, userId, experience);
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided",
  });
});

router.patch("/change-password", (req, res) => {
  const { userId, password, newPassword } = req.body;
  if (
    userId &&
    password &&
    password !== newPassword &&
    newPassword &&
    newPassword.length >= 6
  ) {
    return changePassword(res, userId, password, newPassword);
  } else if (password === newPassword) {
    return res.send({
      success: false,
      data: null,
      error: "New password cannot be the same as your previous password.",
    });
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided.",
  });
});

router.delete("/delete-account", (req, res) => {
  const { userId, password } = req.body;
  if (userId && password) {
    return deleteAccount(res, userId, password);
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided",
  });
});

module.exports = router;

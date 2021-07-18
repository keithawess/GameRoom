const express = require("express");
const router = express.Router();
const { signup, login, changePassword, deleteAccount } = require("../models/users.model");

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
  if (username && password) {
    return login(res, username, password);
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
    const {userId, password} = req.body;
    if (userId && password) {
        return deleteAccount(res, userId, password);
    }
    return res.send({
        success: false,
        data: null,
        error: "Invalid data provided"
    })
})

module.exports = router;

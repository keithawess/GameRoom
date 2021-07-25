const express = require("express");
const router = express.Router();
const { addWin, addLoss, addTie, getStatsByUser } = require("../models/stats.model");

router.patch("/win", (req, res) => {
  const { userId } = req.body;
  if (userId) {
    return addWin(res, userId);
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided",
  });
});

router.patch("/loss", (req, res) => {
  const { userId } = req.body;
  if (userId) {
    return addLoss(res, userId);
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided",
  });
});

router.patch("/tie", (req, res) => {
  const { userId } = req.body;
  if (userId) {
    return addTie(res, userId);
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided",
  });
});

router.get("/user/:user_id", (req, res) => {
        return getStatsByUser(res, req.params.user_id);
});

module.exports = router;

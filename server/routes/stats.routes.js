const express = require("express");
const router = express.Router();
const { addWin } = require("../models/stats.model")

router.patch("/add", (req,res) => {
    const {userId} = req.body;
    if (userId)
    {
        return addWin(res, userId);
    }
    return res.send({
        success: false, data: null, error: "Invalid data provided"
    })
})

module.exports = router;
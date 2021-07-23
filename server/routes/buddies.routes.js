const express = require("express");
const router = express.Router();
const {addBuddy, getBuddyByUser} = require("../models/buddies.model");

router.put("/add", (req,res) => {
    const {userId, name, color, url} = req.body;
    if (userId && name && name.length <= 25 && color && color.length <= 8 && url && url.length <= 60)
    {
        return addBuddy(res, userId, name, url, color);
    }
    return res.send({
        success: false,
        data: null,
        error: "Invalid data provided"
    });
});

router.get("/user/:user_id", (req, res) => {
    return getBuddyByUser(res, req.params.user_id);
})

module.exports = router;
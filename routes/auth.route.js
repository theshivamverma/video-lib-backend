const express = require("express")
const { User } = require("../models/user.model")

const router = express.Router()

router.route("/")
.post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.find({ username });
        if (user[0].password === password) {
          res.status(200).json({ success: true, message: "Authorized user" });
        } else {
          res
            .status(403)
            .json({ success: false, message: "Unauthorized user" });
        }
    } catch (error) {
         res.status(403).json({ success: false, message: "Unauthorized user" });
    }
})

module.exports = router
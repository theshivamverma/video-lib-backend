const express = require("express")
const { getAllVideos, addNewVideo } = require("../controllers/videos.controller")

const router = express.Router()

router.route("/")
.get(getAllVideos)
.post(addNewVideo)

module.exports = router
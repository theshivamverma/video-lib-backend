const mongoose = require("mongoose")

const { Schema } = mongoose

const VideoSchema = new Schema({
    videos: [String]
})

const Videos = new mongoose.model("Videos", VideoSchema)

module.exports = { Videos }
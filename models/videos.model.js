const mongoose = require("mongoose")

const { Schema } = mongoose

const VideoSchema = new Schema({
    videoId: {
        type: String,
        required: "video id is required"
    },
    category: {
        type: String,
        required: "category is required"
    }
})

const Videos = new mongoose.model("Videos", VideoSchema)

module.exports = { Videos }
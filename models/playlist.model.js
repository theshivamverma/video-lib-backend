const mongoose = require("mongoose");
const { User } = require("./user.model");
const { Schema } = mongoose

const PlaylistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
        type: String,
        required: "playlist name is required"
    },
    videos: [String]
})

const Playlist = mongoose.model("Playlist", PlaylistSchema)

module.exports = { Playlist }
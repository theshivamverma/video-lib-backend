const mongoose = require("mongoose")

const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: "name is mandatory"
    },
    email: {
        type: String,
        required: "email is mandatory"
    },
    username: {
        type: String,
        required: "username is required"
    },
    password: {
        type: String,
        required: "password is mandatory"
    },
    playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
    watchlater: [String],
    myplaylist: [String]
})

const User = mongoose.model("User", UserSchema)

module.exports = { User }
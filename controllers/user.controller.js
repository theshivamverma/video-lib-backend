const { User } = require("../models/user.model");

async function getUserFromDB(req, res, next) {
  try {
    const id = req.userId;
    const user = await User.findById(id).populate({
      path: "playlists",
      model: "Playlist",
    });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "error fetching user data" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error fetching user data",
      errorMessage: err.message,
    });
  }
}

function sendUser(req, res) {
  const { user } = req;
  user.password = undefined;
  user._v = undefined;
  res.status(200).json({ success: true, user });
}

async function addToWatchLater(req, res) {
  try {
    const { user } = req;
    const { videoId } = req.body;
    user.watchlater.push(videoId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error adding to watch later",
      errorMessage: error.message,
    });
  }
}

async function removeFromWatchLater(req, res) {
  try {
    const { user } = req;
    const { videoId } = req.body;
    user.watchlater.pull(videoId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error removing from watch later",
      errorMessage: error.message,
    });
  }
}

async function addNewPlaylist(req, res){
  try {
    const { user } = req;
    const { playlistId } = req.body;
    user.playlists.push(playlistId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error adding playlist",
      errorMessage: error.message,
    });
  }
};

async function removePlaylist(req, res){
  try {
    const { user } = req;
    const { playlistId } = req.body;
    user.playlists.pull(playlistId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error removing playlist",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  getUserFromDB,
  sendUser,
  addToWatchLater,
  removeFromWatchLater,
  addNewPlaylist,
  removePlaylist
};

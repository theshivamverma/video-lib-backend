const { Playlist } = require("../models/playlist.model");

async function createNewPlaylist(req, res) {
  try {
    const { name } = req.body;
    const userId = req.userId;
    const playlist = {
        name,
        userId
    }
    const newPlaylist = await Playlist.create(playlist);
    const savedPlaylist = await newPlaylist.save();
    res.status(200).json({ success: true, savedPlaylist });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error creating playlist",
      errorMessage: err.message,
    });
  }
}

async function getPlaylistFromParam(req, res, next, id) {
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      res
        .status(400)
        .json({ success: false, message: "error getting playlist" });
    }
    req.playlist = playlist;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error getting playlist",
      errorMessage: err.message,
    });
  }
}

function sendPlaylist(req, res) {
  const { playlist } = req;
  res.status(200).json({ success: true, playlist });
}

async function addVideo(req, res) {
  try {
    const { videoId } = req.body;
    const { playlist } = req;
    playlist.videos.push(videoId);
    const savedPlaylist = await playlist.save();
    res
      .status(200)
      .json({ success: true, savedPlaylist, message: "added to playlist" });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error adding video to playlist",
      errorMessage: err.message,
    });
  }
}

async function removeVideo(req, res){
  try {
    const { videoId } = req.body;
    const { playlist } = req;
    playlist.videos.pull(videoId);
    const savedPlaylist = await playlist.save();
    res.status(200).json({
      success: true,
      savedPlaylist,
      message: "removed  from playlist",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error adding video to playlist",
      errorMessage: err.message,
    });
  }
};

async function deletePlaylist(req, res) {
  try {
    const { playlist } = req;
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlist._id);
    res
      .status(200)
      .json({ success: true, message: "Playlist deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "error deleting playlist" });
  }
};

module.exports = {
  createNewPlaylist,
  getPlaylistFromParam,
  sendPlaylist,
  addVideo,
  removeVideo,
  deletePlaylist
};

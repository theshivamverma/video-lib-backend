const express = require("express");
const { Playlist } = require("../models/playlist.model");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const playlistsData = await Playlist.find({});
      res.status(200).json({ success: true, playlistsData });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "error fetching playlists data",
        errorMessage: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
        const { playlist } = req.body;
        const newPlaylist = await Playlist.create(playlist);
        const savedPlaylist = await newPlaylist.save();
        res.status(200).json({ success: true, savedPlaylist })
    } catch (err) {
      res
        .status(400)
        .json({
          success: false,
          message: "error creating playlist",
          errorMessage: err.message,
        });
    }
  });

router.param("playlistId", async (req, res, next, id) => {
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
});

router
  .route("/:playlistId")
  .get((req, res) => {
    const { playlist } = req;
    res.status(200).json({ success: true, playlist });
  })

router.route("/:playlistId/add-video")
.post(async (req, res) => {
    try{
        const { videoId } = req.body;
        const { playlist } = req;
        playlist.videos.push(videoId);
        const savedPlaylist = await playlist.save();
        res
          .status(200)
          .json({ success: true, savedPlaylist, message: "added to playlist" });
    }catch(err){
        res.status(400).json({ success: false, message: "error adding video to playlist", errorMessage: err.message })
    }
})

router.route("/:playlistId/remove-video").post(async (req, res) => {
  try {
    const { videoId } = req.body;
    const { playlist } = req;
    playlist.videos.pull(videoId);
    const savedPlaylist = await playlist.save();
    res
      .status(200)
      .json({ success: true, savedPlaylist, message: "removed  from playlist" });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "error adding video to playlist",
        errorMessage: err.message,
      });
  }
});
  
router.route("/:playlistId/delete").post(async (req, res) => {
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
});

module.exports = router
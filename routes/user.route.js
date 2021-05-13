const express = require("express");
const { User } = require("../models/user.model");
const { route } = require("./playlist.route");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const usersData = await User.find({}).select("username email -_id");
      res.status(200).json({ success: true, usersData });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "error fetching users detail",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { user } = req.body;
      const newUser = await User.create(user);
      const savedUser = await newUser.save();
      res.status(200).json({ success: true, savedUser });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "error saving user",
        errorMessage: error.message,
      });
    }
  });

router.param("userId", async (req, res, next, id) => {
  try {
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
});

router.route("/:userId").get((req, res) => {
  const { user } = req;
  user.password = undefined;
  user._v = undefined;
  res.status(200).json({ success: true, user });
});

router.route("/:userId/add-to-watch-later").post(async (req, res) => {
  try {
    const { user } = req;
    const { videoId } = req.body;
    user.watchlater.push(videoId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error adding to watch later",
        errorMessage: error.message,
      });
  }
});

router.route("/:userId/remove-from-watch-later").post(async (req, res) => {
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
});

router.route("/:userId/add-to-myplaylist").post(async (req, res) => {
  try {
    const { user } = req;
    const { videoId } = req.body;
    user.myplaylist.push(videoId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error adding to my playlist",
      errorMessage: error.message,
    });
  }
});

router.route("/:userId/remove-from-myplaylist").post(async (req, res) => {
  try {
    const { user } = req;
    const { videoId } = req.body;
    user.myplaylist.pull(videoId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error removing from my playlist",
      errorMessage: error.message,
    });
  }
});

router.route("/:userId/add-new-playlist")
.post(async (req, res) => {
  try {
    const { user } = req
    const { playlistId } = req.body
    user.playlists.push(playlistId)
    const savedUser = await user.save()
    res.status(200).json({ success: true, savedUser })
  } catch (error) {
    res.status(400).json({ success: false, message: "error adding playlist", errorMessage: error.message })
  }
})

router.route("/:userId/remove-playlist").post(async (req, res) => {
  try {
    const { user } = req;
    const { playlistId } = req.body;
    user.playlists.pull(playlistId);
    const savedUser = await user.save();
    res.status(200).json({ success: true, savedUser });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error removing playlist",
        errorMessage: error.message,
      });
  }
});

module.exports = router;

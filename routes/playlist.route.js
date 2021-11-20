const express = require("express");

const router = express.Router();

const {
  createNewPlaylist,
  getPlaylistFromParam,
  sendPlaylist,
  addVideo,
  removeVideo,
  deletePlaylist,
} = require("../controllers/playlist.controller");

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");

router.use(isAuthenticated);

router.route("/").post(createNewPlaylist);

router.param("playlistId", getPlaylistFromParam);

router.route("/:playlistId").get(sendPlaylist);

router.route("/:playlistId/add-video").post(addVideo);

router.route("/:playlistId/remove-video").post(removeVideo);

router.route("/:playlistId/delete").post(deletePlaylist);

module.exports = router;

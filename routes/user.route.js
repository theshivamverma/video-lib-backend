const express = require("express");

const router = express.Router();

const {
  getUserFromDB,
  sendUser,
  addToWatchLater,
  removeFromWatchLater,
  addNewPlaylist,
  removePlaylist,
} = require("../controllers/user.controller");

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");

router.use(isAuthenticated);

router.use(getUserFromDB);

router.route("/userdetail").get(sendUser);

router.route("/add-to-watch-later").post(addToWatchLater);

router.route("/remove-from-watch-later").post(removeFromWatchLater);

router.route("/add-new-playlist").post(addNewPlaylist);

router.route("/remove-playlist").post(removePlaylist);

module.exports = router;

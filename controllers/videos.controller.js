const { Videos } = require("../models/videos.model");

async function getAllVideos(req, res){
  try {
    const videos = await Videos.find({});
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error fetching videos data",
        errorMessage: error.message,
      });
  }
};

async function addNewVideo(req, res){
  try {
    const { video } = req.body;
    const newVideo = await Videos.create(video);
    const savedVideo = await newVideo.save();
    res.status(200).json({ success: true, savedVideo });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error saving video",
        errorMessage: error.message,
      });
  }
};

module.exports = { getAllVideos, addNewVideo }
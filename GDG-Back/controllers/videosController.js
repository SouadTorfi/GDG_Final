const Videos = require("../models/video");

class Controller {
  // Get All videos
  getAllVideosFacts = (req, res, next) => {
    Videos.find({ page: req.params.name }).then((response, err) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  };

  // Get All videos
  getAllVideos = (req, res, next) => {
    Videos.find({}).then((response, err) => {
      if (err) return next(err);
      res.status(200).json({ success: true, response });
    });
  };
  // Get last videos
  getlastVideo = (req, res, next) => {
    Videos.find({ page: req.params.name })
      .sort({ _id: -1 })
      .limit(1)
      .then((response, err) => {
        if (err) return next(err);
        res.status(200).json({ success: true, response });
      });
  };
  // Get video By Id

  async getVideoById(req, res, next) {
    let { id } = req.params;
    Videos.findById(id, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
  // Add New video
  addVideo = async (req, res, next) => {
    let body = req.body;
    let doc = await new Videos(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  };

  // Edit The video
  updateVideo = (req, res, next) => {
    let { id } = req.params || {};
    let body = req.body;
    Videos.updateOne({ _id: id }, { $set: body }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  };

  // // Delete video
  deleteVideo = (req, res, next) => {
    let { id } = req.params || {};
    Videos.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  };
}
const controller = new Controller();
module.exports = controller;

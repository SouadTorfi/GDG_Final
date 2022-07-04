const { response } = require("express");
const OrderStatus = require("../models/orderStatus");

class Controller {
  getAllStatuses = (req, res, next) => {
    OrderStatus.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  };

  getStatusById = (req, res, next) => {
    let { id } = req.params || {};
    OrderStatus.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  };

  addStatus = (req, res, next) => {
    let body = req.body;
    let doc = new OrderStatus(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  };
}
const controller = new Controller();
module.exports = controller;
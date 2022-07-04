const express = require("express");
const Order = require("../models/order");

class Controller {
  async AllOrders(req, res, next) {

    Order.find().populate("currency_id").populate("client_id").populate('status_id').populate("product_id")
    .exec(function (err, result) {
      if (err) return next(err);
        res.send(result);
      });
  }

  async OneOrder(req, res, next) {
    let { id } = req.params;
    Order.findById(id).populate("currency_id").populate("client_id").populate('status_id').populate("product_id")
    .exec(function (err, response) {
      if (err) return next(err);
        res.send(response);
      });
  }
  async post(req, res, next) {
    let newOrder = await new Order({
      client_id: req.body.client_id,
      currency_id: req.body.currency_id,
      product_id: req.body.product_id,
      status_id: req.body.status_id,
      payment_type: req.body.payment_type,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
    });
    newOrder.save({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async UpdateOrder(req, res, next) {
    const newOrder = {
      client_id: req.body.client_id,
      currency_id: req.body.currency_id,
      product_id: req.body.product_id,
      status_id: req.body.status_id,
      payment_type: req.body.payment_type,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
    };
    let { id } = req.params;
    Order.updateOne({ _id: id }, { $set: newOrder }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async deleteOrder(req, res, next) {
    let { id } = req.params;
    Order.deleteOne({ _id: id }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
}

const controller = new Controller();
module.exports = controller;
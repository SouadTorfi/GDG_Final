const Collection = require("../models/collection");

class Controller {
  async AllCollection(req, res, next) {
    Collection.find({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async getAllCollectionBypage(req, res, next) {
    Collection.find(
      { category_id: req.params.category_id },
      (error, result) => {
        if (error) return next(error);
        res.send(result);
      }
    );
  }

  async OneCollection(req, res, next) {
    let { id } = req.params;
    Collection.findById(id, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }

  async postCollection(req, res, next) {
    
    let newCollection = await new Collection({
      name: req.body.name,
      category_id: req.body.category_id
    });
    newCollection.save({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
      console.log("res ", result);
    });
  }
  async UpdateCollection(req, res, next) {
    const newCollection = {
      name: req.body.name,
      category_id: req.body.category_id,
    };
    let { id } = req.params;
    Collection.updateOne(
      { _id: id },
      { $set: newCollection },
      (error, result) => {
        if (error) return next(error);
        res.send(result);
      }
    );
  }
  async deleteCollection(req, res, next) {
    let { id } = req.params;
    Collection.deleteOne({ _id: id }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
}

const controller = new Controller();
module.exports = controller;
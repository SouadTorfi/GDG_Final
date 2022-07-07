const Email = require("../models/email");

class Controller {

  async AllEmails(req, res, next) {
    Email.find({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }
    addEmail(req, res, next){
    let body = req.body;
    let doc = new Email(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  };
 
}

const controller = new Controller();
module.exports = controller;
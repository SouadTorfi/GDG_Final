const About = require("../models/about");

class Controller {

  AllAbout_Us = (req,res,next) =>{
    About.find().sort({_id:-1}).limit(1).then((response,err) =>{
        if(err) return next(err);
        res.status(200).json({success:true,response});
    });
}

   OneAbout_Us(req, res, next) {
    let { id } = req.params;
    About.findById(id, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  async post(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    console.log("files ",req.files);
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }

    console.log("reqfiles ",reqFiles);
    
    const About_Us = await new About({
      english_paragraph: req.body.english_paragraph,
      arabic_paragraph: req.body.arabic_paragraph,
      image: reqFiles
    });
    About_Us.save({}, (error, response) => {
      if (error) return next(error);
      res.send(response);
    });
  }

  // async UpdateAbout_Us(req, res, next) {
  //   const newAbout_Us = {
  //     title: req.body.title,
  //     english_paragraph: req.body.english_paragraph,
  //     arabic_paragraph: req.body.arabic_paragraph,
  //   };
  //   let { id } = req.params;
  //   About.updateOne({ _id: id }, { $set: newAbout_Us }, (error, result) => {
  //     if (error) return next(error);
  //     res.send(result);
  //   });
  // }


  async deleteAbout_Us(req, res, next) {
    let { id } = req.params;
    About.deleteOne({ _id: id }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
}

const controller = new Controller();
module.exports = controller;
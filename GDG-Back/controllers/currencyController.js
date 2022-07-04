const { response } = require("express");
const Currency = require("../models/currency");

class Controller{
        // Get All Currencies
        getAllCurrencies = (req,res,next) =>{
            Currency.find().sort({_id:-1}).then((response,err) =>{
                if(err) return next(err);
                res.status(200).json({success:true,response});
            });
        }
        // Get Currency By Id
        
        getCurrencyById = (req, res, next) => {
            let { id } = req.params || {};
            Currency.findOne({ _id: id }, (err, response) => {
              if (err) return next(err);
              res.status(200).send({ success: true, response });
            });
          };

        // Add New Currency
        addCurrency = async(req,res,next)=>{
            let body = req.body;
            let doc = await new Currency(body);
            doc.save((err,response)=>{
                if(err) return next(err);
                res.status(200).send({success:true,response});
            });
        }

        // Edit The currency
        updateCurrency = (req,res,next)=>{
            let {id} = req.params || {};
            let body = req.body;
            Currency.updateOne({_id:id},{$set:body},(err,response)=>{
                if(err) return next(err);
                res.status(200).send({success:true,response});
            });
        }

        // // Delete Currrency
        deleteCurrency = (req,res,next)=>{
            let {id} = req.params || {};
             Currency.findByIdAndDelete({_id:id},(err,response)=>{
                if(err) return next(err);
                res.status(200).send({success:true,response});
            });
        }
}
const controller = new Controller();
module.exports = controller;
// const Product = require("../models/product");

// class Controller {
//   getAllProducts(req,res,next){
//   Product.find().populate("order").populate("category").populate('Collection').exec(function (err, result) {
//     if (err) return next(err);
//       res.send(result);
//     });
//   }

//   async getAllproductByCategory(req, res) {
//     try {
//       // first we are finding the products we have
//       let query = Product.find({ category: req.params.name });
//       // then we want to get which page we are in
//       const page = parseInt(req.query.page) || 1;
//       // then we  decide the limit on how much product will be shown
//       const pageSize = parseInt(req.query.limit) || 12;
//       // then we calculate how ma ny doc we want to skip
//       const skip = (page - 1) * pageSize;
//       // and then we calculate total document count
//       // const total = await Product.countDocuments();
//       const total = await Product.countDocuments(query);
//       // here we are dividing the total on page sizes
//       const pages = Math.ceil(total / pageSize);
//       // and after that we are skipping
//       query = query.skip(skip).limit(pageSize);

//       if (page > pages) {
//         return res.status(404).json({
//           status: "fail",
//           message: "No page found",
//         });
//       }

//       const result = await query;
//       res.status(200).json({
//         status: "success",
//         count: result.length,
//         page,
//         pages,
//         data: result,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         status: "error",
//         message: "Server Error",
//       });
//     }
//   }

//   async AllProductsByCollection(req, res, next) {
//     console.log(typeof req.body.collection);
//     //let collection = JSON.parse(req.body.collection); //postman
//     let collection = req.body.collection; //website

//     let collection_request_array = [];
//     let obj;
//     console.log("collecti9on ", collection);

//     collection.map((each) => {
//       obj = { Collection: each };
//       collection_request_array.push(obj);
//     });
//     console.log("collection_request_array ", collection_request_array);
//     let query = Product.find(
//       {
//         $and: [
//           {
//             $or: collection_request_array,
//           },
//         ],
//       }
//       // function (err, results) {
//       //   if (err) return next(err);
//       //   res.send(results);
//       // }
//     );

//     const page = parseInt(req.query.page) || 1;
//     // then we  decide the limit on how much product will be shown
//     const pageSize = parseInt(req.query.limit) || 12;
//     // then we calculate how ma ny doc we want to skip
//     const skip = (page - 1) * pageSize;
//     // and then we calculate total document count
//     // const total = await Product.countDocuments();
//     const total = await Product.countDocuments(query);
//     // here we are dividing the total on page sizes
//     const pages = Math.ceil(total / pageSize);
//     // and after that we are skipping
//     query = query.skip(skip).limit(pageSize);

//     if (page > pages) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No page found",
//       });
//     }

//     const result = await query;
//     res.status(200).json({
//       status: "success",
//       count: result.length,
//       page,
//       pages,
//       data: result,
//     });
//   }
//   catch(err) {
//     console.log(err);
//     res.status(500).json({
//       status: "error",
//       message: "Server Error",
//     });
//   }

//   async OneProduct(req, res, next) {
//     let { id } = req.params;
//     Product.findById(id, (error, response) => {
//       if (error) return next(error);
//       res.send(response);
//     });
//   }
//   async post(req, res, next) {
//     const reqFiles = [];
//     const url = req.protocol + "://" + req.get("host");
//     for (var i = 0; i < req.files.length; i++) {
//       reqFiles.push(url + "/images/" + req.files[i].filename);
//     }

//     console.log("product ", req.body);
//     let newProduct = await new Product({
//       name: req.body.name,
//       price: req.body.price,
//       size: req.body.size,
//       clothes: req.body.clothes,
//       package: req.body.package,
//       category: req.body.category,
//       Collection: req.body.Collection,
//       order: req.body.order,
//       image: reqFiles,
//     });
//     newProduct.save({}, (error, result) => {
//       if (error) return next(error);
//       res.send(result);
//       console.log("res ", result);
//     });
//   }
//   async UpdateProduct(req, res, next) {
//     const reqFiles = [];
//     const url = req.protocol + "://" + req.get("host");
//     for (var i = 0; i < req.files.length; i++) {
//       reqFiles.push(url + "/images/" + req.files[i].filename);
//     }

//     const newProduct = {
//       name: req.body.name,
//       price: req.body.price,
//       size: req.body.size,
//       clothes: req.body.clothes,
//       package: req.body.package,
//       category: req.body.category._id,
//       Collection: req.body.Collection,
//       order: req.body.order,
//       image: reqFiles,
//     };
//     let { id } = req.params;
//     Product.updateOne({ _id: id }, { $set: newProduct }, (error, result) => {
//       if (error) return next(error);
//       res.send(result);
//     });
//   }
//   async deleteProduct(req, res, next) {
//     let { id } = req.params;
//     Product.deleteOne({ _id: id }, (error, result) => {
//       if (error) return next(error);
//       res.send(result);
//     });
//   }

//   // async OneProduct(req, res, next) {
//   //   let { id } = req.params;
//   //   Product.findById(id, (error, result) => {
//   //     if (error) return next(error);
//   //     res.send(result);
//   //   });
//   // }
//   // async post(req, res, next) {
//   //   let newProduct = await new Product({
//   //     name: req.body.name,
//   //     price: req.body.price,
//   //     size: req.body.size,
//   //     clothes: req.body.clothes,
//   //     package: req.body.package,
//   //     category: req.body.category,
//   //     order: req.body.order,
//   //   });
//   //   newProduct.save({}, (error, result) => {
//   //     if (error) return next(error);
//   //     res.send(result);
//   //   });
//   // }
//   // async UpdateProduct(req, res, next) {
//   //   const newProduct = {
//   //     name: req.body.name,
//   //     price: req.body.price,
//   //     size: req.body.size,
//   //     clothes: req.body.clothes,
//   //     package: req.body.package,
//   //     category: req.body.category,
//   //     order: req.body.order,
//   //   };
//   //   let { id } = req.params;
//   //   Product.updateOne({ _id: id }, { $set: newProduct }, (error, result) => {
//   //     if (error) return next(error);
//   //     res.send(result);
//   //   });
//   // }
//   // async deleteProduct(req, res, next) {
//   //   let { id } = req.params;
//   //   Product.deleteOne({ _id: id }, (error, result) => {
//   //     if (error) return next(error);
//   //     res.send(result);
//   //   });
//   // }
// }

// const controller = new Controller();
// module.exports = controller;
const Product = require("../models/product");

class Controller {
  getAllProducts(req, res, next) {
    Product.find()
      .populate("order")
      .populate("category")
      .populate("Collection")
      .exec(function (err, result) {
        if (err) return next(err);
        res.send(result);
      });
  }

  async getAllproductByCategory(req, res) {
    try {
      // first we are finding the products we have
      let query = Product.find({ category: req.params.category_id });
      // then we want to get which page we are in
      const page = parseInt(req.query.page) || 1;
      // then we  decide the limit on how much product will be shown
      const pageSize = parseInt(req.query.limit) || 12;
      // then we calculate how ma ny doc we want to skip
      const skip = (page - 1) * pageSize;
      // and then we calculate total document count
      // const total = await Product.countDocuments();
      const total = await Product.countDocuments(query);
      // here we are dividing the total on page sizes
      const pages = Math.ceil(total / pageSize);
      // and after that we are skipping
      query = query.skip(skip).limit(pageSize);

      if (page > pages) {
        return res.status(404).json({
          status: "fail",
          message: "No page found",
        });
      }

      const result = await query;
      res.status(200).json({
        status: "success",
        count: result.length,
        page,
        pages,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "Server Error",
      });
    }
  }

  async AllProductsByCollection(req, res, next) {
    console.log(typeof req.body.collection);
    //let collection = JSON.parse(req.body.collection); //postman
    let collection = req.body.collection; //website

    let collection_request_array = [];
    let obj;
    console.log("collecti9on ", collection);

    collection.map((each) => {
      obj = { Collection: each };
      collection_request_array.push(obj);
    });
    console.log("collection_request_array ", collection_request_array);
    let query = Product.find(
      {
        $and: [
          {
            $or: collection_request_array,
          },
        ],
      }
      // function (err, results) {
      //   if (err) return next(err);
      //   res.send(results);
      // }
    );

    const page = parseInt(req.query.page) || 1;
    // then we  decide the limit on how much product will be shown
    const pageSize = parseInt(req.query.limit) || 12;
    // then we calculate how ma ny doc we want to skip
    const skip = (page - 1) * pageSize;
    // and then we calculate total document count
    // const total = await Product.countDocuments();
    const total = await Product.countDocuments(query);
    // here we are dividing the total on page sizes
    const pages = Math.ceil(total / pageSize);
    // and after that we are skipping
    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  }
  catch(err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }

  async OneProduct(req, res, next) {
    let { id } = req.params;
    // Product.findById(id, (error, response) => {
    //   if (error) return next(error);
    //   res.send(response);
    // });

    Product.findById(id)
      .populate("category")
      .exec(function (error, response) {
        if (error) return next(error);
        res.send(response);
      });
  }
  async post(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }

    console.log("product ", req.body);
    let newProduct = await new Product({
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      clothes: req.body.clothes,
      package: req.body.package,
      category: req.body.category,
      Collection: req.body.Collection,
      order: req.body.order,
      image: reqFiles,
    });
    newProduct.save({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
      console.log("res ", result);
    });
  }
  async UpdateProduct(req, res, next) {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/images/" + req.files[i].filename);
    }

    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      clothes: req.body.clothes,
      package: req.body.package,
      category: req.body.category._id,
      Collection: req.body.Collection,
      order: req.body.order,
      image: reqFiles,
    };
    let { id } = req.params;
    Product.updateOne({ _id: id }, { $set: newProduct }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async deleteProduct(req, res, next) {
    let { id } = req.params;
    Product.deleteOne({ _id: id }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }

  // async OneProduct(req, res, next) {
  //   let { id } = req.params;
  //   Product.findById(id, (error, result) => {
  //     if (error) return next(error);
  //     res.send(result);
  //   });
  // }
  // async post(req, res, next) {
  //   let newProduct = await new Product({
  //     name: req.body.name,
  //     price: req.body.price,
  //     size: req.body.size,
  //     clothes: req.body.clothes,
  //     package: req.body.package,
  //     category: req.body.category,
  //     order: req.body.order,
  //   });
  //   newProduct.save({}, (error, result) => {
  //     if (error) return next(error);
  //     res.send(result);
  //   });
  // }
  // async UpdateProduct(req, res, next) {
  //   const newProduct = {
  //     name: req.body.name,
  //     price: req.body.price,
  //     size: req.body.size,
  //     clothes: req.body.clothes,
  //     package: req.body.package,
  //     category: req.body.category,
  //     order: req.body.order,
  //   };
  //   let { id } = req.params;
  //   Product.updateOne({ _id: id }, { $set: newProduct }, (error, result) => {
  //     if (error) return next(error);
  //     res.send(result);
  //   });
  // }
  // async deleteProduct(req, res, next) {
  //   let { id } = req.params;
  //   Product.deleteOne({ _id: id }, (error, result) => {
  //     if (error) return next(error);
  //     res.send(result);
  //   });
  // }
}

const controller = new Controller();
module.exports = controller;

var productModel = require('../models/product');

module.exports.getProducts = function(req, res) {
  (async () => {
    try {
        var data = await productModel.find(req.query);
        return res.status(200).send({data : data, message : 'product fetched successfully'})
    } catch (err) {
        return res.status(500).send({err : err, message : 'Internal Server Error'}) 
    }
  })(req, res);
};

module.exports.createProduct = function(req, res) {
    (async () => {
      try {
          var data = await productModel.create(req.body);
          return res.status(201).send({data : data, message : 'product created successfully'})
      } catch (err) {
          return res.status(500).send({err : err, message : 'Internal Server Error'}) 
      }
    })(req, res);
  };
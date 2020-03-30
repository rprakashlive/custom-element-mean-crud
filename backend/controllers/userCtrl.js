var userModel = require('../models/user');

module.exports.getUsers = function(req, res) {
  (async () => {
    try {
        var data = await userModel.find(req.query);
        return res.status(200).send({data : data, message : 'user fetched successfully'})
    } catch (err) {
        return res.status(500).send({err : err, message : 'Internal Server Error'}) 
    }
  })(req, res);
};

module.exports.createUser = function(req, res) {
    (async () => {
      try {
          var data = await userModel.create(req.body);
          return res.status(201).send({data : data, message : 'user created successfully'})
      } catch (err) {
          return res.status(500).send({err : err, message : 'Internal Server Error'}) 
      }
    })(req, res);
  };
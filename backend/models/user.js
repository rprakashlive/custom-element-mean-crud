var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String
}, {timestamps: true, strict: false});

var userModel  = mongoose.model('User', userSchema);
module.exports.userModel = userModel;

module.exports.find = function(param) {
    return new Promise((resolve, reject) => {
        userModel.find(param, function(err, data){
            if (err) {
                reject(err);
            }
            if (data) {
                resolve(data);
            }
        });
    });   
}

module.exports.create = function(param) {
    return new Promise((resolve, reject) => {
        userModel.create(param, function(err, data){
            if (err) {
                reject(err);
            }
            if (data) {
                resolve(data);
            }
        });
    });   
}


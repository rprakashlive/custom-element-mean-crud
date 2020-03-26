var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    desc: String,
}, {timestamps: true, strict: false});

var productModel  = mongoose.model('Product', ProductSchema);
module.exports.productModel = productModel;

module.exports.find = function(param) {
    return new Promise((resolve, reject) => {
        productModel.find(param, function(err, data){
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
        productModel.create(param, function(err, data){
            if (err) {
                reject(err);
            }
            if (data) {
                resolve(data);
            }
        });
    });   
}


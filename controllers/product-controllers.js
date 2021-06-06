var async = require('async');

// Model
var Product = require('../models/product');
var functions = require('./functions');

exports.displayProducts = (req, res) => {
   Product.find({})
      .then(products => {
         res.render('pages/product', {
            products: products,
            priceConverter: functions.numberWithCommas,
         });
      })
      .catch(err => {
         console.log('Error: ', err);
         throw err;
      });
}

exports.displayCategory = (req, res) => {
   res.render('pages/category');
}

exports.deleteProduct = function (req, res, next) {
   const id = req.params.id;
   console.log("id product deleted:", id)

   Product.deleteOne({ _id: id })
      .then(product => {
         res.redirect('/product');
      })
}
var async = require('async');

// Model
var Product = require('../models/product');
var functions = require('./functions');

// Show all products
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

// Add product
exports.addProduct = async function (req, res, next) {
   const newName = req.body.name;
   const newCategory = req.body.category;
   const newProducer = req.body.producer;
   const newPrice = req.body.price;
   const newOldPrice = req.body.old_price;
   const newQuantity = req.body.quantity;
   const newDescription = req.body.des;
   const newConfiguration = req.body.info;

   if (!req.file) {
      res.status(401).json({ error: 'Please provide an image' });
   }
   const uniqueFilename = new Date().toISOString();
   const cloudinary = require('cloudinary').v2;
   cloudinary.config({
      cloud_name: 'lethanhtin',
      api_key: '259864364255718',
      api_secret: '8PaulhQKCv3BCW6SdXMHu5NHSzY'
   })
   cloudinary.uploader.upload(
      "data:image/png;base64," + (req.file.buffer).toString('base64'),
      { public_id: 'Electro/' + uniqueFilename, tags: 'product' }, // directory and tags are optional
      function (err, image) {
         if (err) {
            return res.send(err);
         }
         Product.create({
            name: newName,
            category: newCategory,
            producer: newProducer,
            price: newPrice,
            old_price: newOldPrice,
            quantity: newQuantity,
            imgSrc: image.url,
            description: newDescription,
            configuration: newConfiguration,
         },
         function (err, small) {
            if (err) return next(err);
            else {
               res.redirect('/product');
            }
         });
      }
   )
}

// Edit product
exports.editProduct = (req, res) => {
   console.log(req.body)
   const newName = req.body.name;
   const newCategory = req.body.category;
   const newProducer = req.body.producer;
   const newPrice = req.body.price;
   const newOldPrice = req.body.old_price;
   const newQuantity = req.body.quantity;
   const newDescription = req.body.des;
   const newConfiguration = req.body.info;

   if (!req.file) {
      res.status(401).json({ error: 'Please provide an image...!' });
   }
   const uniqueFilename = new Date().toISOString();
   const cloudinary = require('cloudinary').v2;
   cloudinary.config({
      cloud_name: 'lethanhtin',
      api_key: '259864364255718',
      api_secret: '8PaulhQKCv3BCW6SdXMHu5NHSzY'
   })
   cloudinary.uploader.upload(
      "data:image/png;base64," + (req.file.buffer).toString('base64'),
      { public_id: 'Electro/' + uniqueFilename, tags: 'product' }, // directory and tags are optional
      function (err, image) {
         if (err) {
            return res.send(err);
         }
         Product.update({
            name: newName,
            category: newCategory,
            producer: newProducer,
            price: newPrice,
            old_price: newOldPrice,
            quantity: newQuantity,
            imgSrc: image.url,
            description: newDescription,
            configuration: newConfiguration,
         },
         function (err, small) {
            if (err) return next(err);
            else {
               res.redirect('/product');
            }
         });
      }
   )
}

// Delete product
exports.deleteProduct = function (req, res, next) {
   const id = req.params.id;
   console.log("id product deleted:", id)

   Product.deleteOne({ _id: id })
      .then(product => {
         res.redirect('/product');
      })
}
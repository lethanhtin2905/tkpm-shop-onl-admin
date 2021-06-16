var Store = require('../models/store');
const Resize = require('../resize');
var path = require('path');

// Store page
exports.displayStore = (req, res) => {
   Store.find({})
      .then(stores => {
         res.render('pages/store', {
            stores: stores
         });
      })
      .catch(err => {
         console.log('Error: ', err);
         throw err;
      });
}

// Add store
exports.addStore = async function (req, res, next) {
   var name = req.body.name;
   var describe = req.body.describe;
   var address = req.body.address;

   console.log("Add new store: ")
   console.log("name:", name);
   console.log("describe:", describe);
   console.log("address:", address);

   if (!req.file) {
      res.status(401).json({ error: 'Please provide an image' });
   }
   const uniqueFilename = new Date().toISOString();
   const cloudinary = require('cloudinary').v2;
   cloudinary.config({
      cloud_name: 'trantuantrong',
      api_key: '426257212753388',
      api_secret: 'xpjjmLAsjx457tJYZ6qi7diHm6s'
   })
   cloudinary.uploader.upload(
      "data:image/png;base64," + (req.file.buffer).toString('base64'),
      { public_id: 'blog/' + uniqueFilename, tags: 'product' }, // directory and tags are optional
      function (err, image) {
         if (err) {
            return res.send(err);
         }
         Store.create({
            name: name,
            image: image.url,
            describe: describe,
            address: address
         },
         function (err, small) {
            if (err) return next(err);
            else {
               res.redirect('/store');
            }
         });
         console.log(image);
      }
   )
}

// Delete store
exports.deleteStore = function (req, res, next) {
   const id = req.params.id;
   console.log("id store deleted:", id);

   Store.findOne({ id: req.body.id })
      .then(store => {
         if (id != '') {
            store.deleteOne({ id: req.body.id });
         }
         res.redirect('/store');
         next();
      })
} 
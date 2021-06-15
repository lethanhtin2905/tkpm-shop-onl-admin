var Store = require('../models/store');
const Resize = require('../resize');
var path = require('path');

//Store page
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

//Delete store
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
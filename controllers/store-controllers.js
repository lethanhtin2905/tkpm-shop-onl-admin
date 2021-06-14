var Store = require('../models/store');
const Resize = require('../resize');
var path = require('path');

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
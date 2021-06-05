const bcrypt = require('bcryptjs');
const passport = require('passport');

var User = require('../models/user');


exports.displayUser = (req, res) => {
   User.find({})
      .then(users => {
         res.render('pages/user', {
            users: users
         });
      })
      .catch(err => {
         console.log('Error: ', err);
         throw err;
      });
}




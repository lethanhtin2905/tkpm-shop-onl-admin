//const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Model
var User = require('../models/user');

// Show login page
exports.loginPage = (req, res) => {
    res.render('pages/login');
}

// Function login
exports.loginHandle = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

// Function logout
exports.logoutHandle = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Bạn đã đăng xuất');
    res.redirect('/login');
}
var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin-controllers');

// Login Page
router.get('/login', adminControllers.loginPage);

// Login Handle
router.post('/login', adminControllers.loginHandle);

// Logout Handle
router.get('/logout', adminControllers.logoutHandle);


module.exports = router;

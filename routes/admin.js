var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin-controllers');

// Login page
router.get('/login', adminControllers.loginPage);

// Login handle
router.post('/login', adminControllers.loginHandle);

// Logout handle
router.get('/logout', adminControllers.logoutHandle);

module.exports = router;
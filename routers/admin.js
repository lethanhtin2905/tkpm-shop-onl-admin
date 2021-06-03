var express = require('express');
var router = express.Router();
var adminControllers = require('../controller/admin-controllers');

// Login Page
router.get('/login', adminControllers.loginPage);

module.exports = router;

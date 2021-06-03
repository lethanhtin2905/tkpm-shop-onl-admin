var express = require('express');
var router = express.Router();
var adminControllers = require('../controllers/admin-controllers');

// Login Page
router.get('/login', adminControllers.loginPage);

module.exports = router;

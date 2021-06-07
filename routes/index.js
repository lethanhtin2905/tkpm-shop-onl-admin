var express = require('express');
var router = express.Router();
const passport = require('passport');
var homeControllers = require('../controllers/home-controllers');
var userControllers = require('../controllers/user-controllers');
const upload = require('../uploadMiddleware');
const { ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/',ensureAuthenticated, homeControllers.index);
router.get('/home',ensureAuthenticated, homeControllers.index);

// Customer
router.get('/user',ensureAuthenticated, userControllers.displayUser);
router.get('/user/delete/:id',ensureAuthenticated, userControllers.deleteUser);
router.post('/user/edit',userControllers.editUser);
router.get('/user/lock',ensureAuthenticated, userControllers.lockUser);
router.get('/user/unlock',ensureAuthenticated, userControllers.unlockUser);
router.get('/user/autho',ensureAuthenticated, userControllers.AuthoUser);

// Product
router.get('/product', productControllers.displayProducts);
router.post('/product/edit',upload.single('image'), productControllers.editProduct);
router.get('/product/delete/:id', productControllers.deleteProduct);

module.exports = router;

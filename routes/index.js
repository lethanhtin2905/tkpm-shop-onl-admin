var express = require('express');
var router = express.Router();
const passport = require('passport');
var homeControllers = require('../controllers/home-controllers');
var productControllers = require('../controllers/product-controllers')
var userControllers = require('../controllers/user-controllers');
var orderControllers = require('../controllers/order-controllers');
const upload = require('../uploadMiddleware');
const { ensureAuthenticated } = require('../config/auth');

// Get home page
router.get('/',ensureAuthenticated, homeControllers.index);
router.get('/home',ensureAuthenticated, homeControllers.index);

// Get product page
router.get('/product', productControllers.displayProducts);
// Add product
router.post('/product/add',upload.single('image'), productControllers.addProduct);
// Update product
router.post('/product/edit',upload.single('image'), productControllers.editProduct);
// Delete product
router.get('/product/delete/:id', productControllers.deleteProduct);

// Get customer page
router.get('/user',ensureAuthenticated, userControllers.displayUser);
// Delete customer
router.get('/user/delete/:id',ensureAuthenticated, userControllers.deleteUser);
// Update customer
router.post('/user/edit',userControllers.editUser);
// Lock customer
router.get('/user/lock',ensureAuthenticated, userControllers.lockUser);
// Unlock customer
router.get('/user/unlock',ensureAuthenticated, userControllers.unlockUser);
// Grant admin
router.get('/user/autho',ensureAuthenticated, userControllers.AuthoUser);

// Get order page
router.get('/order', ensureAuthenticated, orderControllers.displayOrder);
// Update status for order
router.post('/order/update-status-order', orderControllers.updateOrder);

module.exports = router;

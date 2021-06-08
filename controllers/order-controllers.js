var Order = require('../models/order');

exports.displayOrder = (req, res) => {
    Order.find({})
        .then(orders => {
            res.render('pages/order', {
                orders: orders
            });
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        });
}
var Order = require('../models/order');

// Show all orders
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

// Change status of order
exports.updateOrder = (req, res) => {
    var id = req.query.id;
    var status = req.query.status;
    var statusNumber = parseInt(status, 10);


    if (statusNumber != -1) {
        Order.updateOne({ _id: id }, {
            $set: {
                status: status,
            }
        }).then(res.redirect('/order'));
    } else {
        res.redirect('/order')
    }
}
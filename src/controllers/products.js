var controller = {}
var db = require('../models')
var Product = db.product;
var Op = db.Sequelize.Op;

controller.products = (req, res) => {
    var view = {}
    view.title = "Productos";
    view.parent = "Inventario /";
    view.user = req.session.user;
    view.status = [];

    res.render('products', view)
}

controller.datafill = (req, res) => {
    Product.findAll(
      {
        where: {
          status_id: {
            [Op.ne]: 'STAUTS-0003'
          }
        }
      }
    ).then( product => {
        console.log(product);
        res.send(product)
    })
}

module.exports = controller;

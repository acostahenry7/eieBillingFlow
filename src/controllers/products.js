var controller = {}
var db = require('../models')
var Product = db.product;
var Model = db.model;
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

controller.create = (req, res) => {
   console.log(req.body);



  Model.findOne(
    {
      attributes: ['model']
    },
    {
      where: {
         model_id: {
           [Op.eq]: req.body.modelId
         }
      }
    }
  ).then( model => {

      Product.create({
         product_name: model,
         product_description: '',
         product_type_id: req.body.productTypeId
      })
  })
   res.send('hi')
}

module.exports = controller;

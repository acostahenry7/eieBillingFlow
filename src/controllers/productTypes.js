var controller = {}

var db = require('../models')
var ProductType = db.productType;
var Op = db.Sequelize.Op;

controller.productTypes =  (req, res) => {

  var view = {}

  view.parent = "Inventario /"
  view.title = "Tipos de Productos";
  view.user = req.session.user;
  view.status = [];
  res.render("productTypes" , view)
}


controller.datafill = (req, res)=> {
  ProductType.findAll({
    where: {
      status_id: {
        [Op.ne]: 'STATUS-0003'
      }
    }
  })
    .then( productType => {
        console.log(productType);
        res.send(productType)
    })
}

controller.createProductType = (req, res) => {
  ProductType.create({
      product_type: req.body.productType,
      creation_date: req.body.creationDate,
      modification_date: req.body.modificationDate,
      status_id: "STATUS-0001",
      outlet_id: "OUTLET-0001"
  })
  .then(productType => {
      console.log(productType);
      res.send(productType)
  })
}


controller.updateProductType = (req, res) => {
   ProductType.update({

   }).then(productType => {
      res.send(200)
   })
}

controller.deleteProductType = (req, res) => {
  ProductType.update({
      status_id: 'STATUS-0003' },
      { where: {
        product_type_id: req.body.productTypeId
      }
  })
  .then( () => {
    res.json(true)
  })

}


module.exports = controller;

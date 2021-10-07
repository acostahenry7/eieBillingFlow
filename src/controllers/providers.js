const db = require("../models")
const Provider = db.provider
const Op = db.Sequelize.Op

const controller = {}


controller.providers = (req, res) => {
  var view = {}
  view.title = "Proveedores";
  view.parent="Inventario /";
  view.user = req.session.user;
  view.status = [];

  res.render('providers', view)
}


controller.datafill = (req, res) => {

  Provider.findAll(
    {
      where: {
        status_id: {
          [Op.ne] : "STATUS-0003"
        }
      }
    }
  ).then(provider => {
      res.send(provider)
  })
}


module.exports = controller

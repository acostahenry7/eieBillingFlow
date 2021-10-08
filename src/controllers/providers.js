const db = require("../models")
const Provider = db.provider
const Country = db.country
const Op = db.Sequelize.Op

const controller = {}


controller.providers = (req, res) => {
  var view = {}
  view.title = "Proveedores";
  view.parent="Inventario /";
  view.user = req.session.user;
  view.country = []
  view.status = [];

  Country.findAll(
    {
      order: [
        ['country_name', 'ASC']
      ]
    },
    {
      attributes: ['country_id', 'country_name']
    }
  ).then( countries => {
        for(i=0; i< countries.length; i++) {
            console.log("COUNTRIES" , countries[i].dataValues.country_id, countries[i].dataValues.country_name);
            view.country.push(
              {
                country_id: countries[i].dataValues.country_id,
                country_name: countries[i].dataValues.country_name
              }
            );
        }
        res.render('providers', view)
    })

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
  ).then(providers => {

      res.send(providers)
  })
}


module.exports = controller

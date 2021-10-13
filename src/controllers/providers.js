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
  ).then(providers => {

      res.send(providers)
  })
}

controller.create = (req, res) => {

  Provider.create({
     provider_name: req.body.name,
     rnc: req.body.rnc,
     country: req.body.country,
     province_id: req.body.province,
     municipality_id: req.body.municipality,
     sector_id: req.body.sector,
     street_1: req.body.street1,
     street_2: req.body.street2,
     phone_number: req.body.phone,
     email: req.body.email,
     creation_date: req.body.creationDate,
     modification_date: req.body.modificationDate,
     website: req.body.website,
     created_by: req.session.user,
     outlet_id: req.body.outletId,
     status_id: 'STATUS-0001'
  })
  .then( provider => {
      res.send(provider)
  })

}


controller.delete = (req, res) => {
  Provider.update({
      status_id: 'STATUS-0003' },
      {
        where: {
        provider_id: req.body.providerId
      }
  })
  .then( () => {
    res.json(true)
  })

}


controller.update = (req, res) => {

  Provider.update({
    provider_name: req.body.name,
    rnc: req.body.rnc,
    country: req.body.country,
    province_id: req.body.province,
    municipality_id: req.body.municipality,
    sector_id: req.body.sector,
    street_1: req.body.street1,
    street_2: req.body.street2,
    phone_number: req.body.phone,
    email: req.body.email,
    modification_date: req.body.modificationDate,
    website: req.body.website,
    created_by: req.session.user,
    outlet_id: req.body.outletId,
    status_id: 'STATUS-0001'
  },
  {
    where: {
      provider_id: req.body.providerId
    }
  })
  .then( provider => {
      console.log(provider);
      res.send(provider)
  })
}

module.exports = controller

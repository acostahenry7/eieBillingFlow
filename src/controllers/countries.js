const db = require('../models')
const Country = db.country

const controller = {}

controller.countries = (req, res) => {

  Country.findAll(
    {
      order: [
        ['country_name', 'ASC']
      ]
    },
    {
      attributes: ['country_id', 'country_name']
    }
  ).then (countries => {
      res.send(countries);
  })

}

module.exports = controller

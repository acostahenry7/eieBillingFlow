const db = require("../models")
const Provider = db.provider
const Op = sd.Sequelize.Op

const controller = {}


controller.datafill = (req, res) => {

  Provider.findAll(
    {
      where: {
        status_id: [
          [Op.ne] : "STATUS-0003"
        ]
      }
    }
  ).then(provider => {
      res.send(provider)
  })
}


module.exports = controller

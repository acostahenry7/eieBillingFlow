
const db = require("../models");
const Province = db.province;
const Op = db.Sequelize.Op;


var controller = {}

controller.getProvinces = (req, res) => {

  var provincesList = [];

  Province.findAll(
    {
      where: {
         country_id: {
           [Op.eq] : req.body.countryId
         }
      }
    },
    {
      attributes: ['province_id', 'province_name']
    }
    )
    .then( provinces => {
        for(i=0; i< provinces.length; i++) {
            provincesList.push(
              {
                province_id: provinces[i].dataValues.province_id,
                province_name: provinces[i].dataValues.province_name
              }
            );
        }
        res.send(provincesList)
        console.log(provincesList);
    })
}



module.exports =  controller;

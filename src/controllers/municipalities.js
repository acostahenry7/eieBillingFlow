const db = require("../models");
const Province = db.province;
const Municipality = db.municipality;
const Op = db.Sequelize.Op;


var controller = {}

controller.getMunicipalities = (req, res) => {

  var municipalitiesList = [];

  Municipality.findAll(
    {
      where: {
         province_id: {
           [Op.eq] : req.body.provinceId
         }
      }
    },
    {
      attributes: ['municipality_id', 'municipality_name']
    }
    )
    .then( municipalities => {
        for(i=0; i< municipalities.length; i++) {
            municipalitiesList.push(
              {
                municipality_id: municipalities[i].dataValues.municipality_id,
                municipality_name: municipalities[i].dataValues.municipality_name
              }
            );
        }
        res.send(municipalitiesList)
        console.log(municipalitiesList);
    })
}



module.exports =  controller;

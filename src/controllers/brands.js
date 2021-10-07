const db = require("../models");
const Brand = db.brand;
const Model = db.model;
const Status = db.status;
const Op = db.Sequelize.Op;



var controller = {};
var rString = 0;
var params = {};

controller.brands = (req, res) => {

   var view = {}
   view.title = "Marcas";
   view.parent = "Configuración /";
   view.user = req.session.user;
   view.status = [];

   res.render('brands', view);
}

controller.datafill = (req, res) => {
    Brand.findAll({
       where: {
         status_id:{
           [Op.ne]: 3
         }
       }
    }).then(brand => {
        //console.log("brand: ", brand);
        res.send(JSON.stringify(brand))
    })
}

controller.createBrand = (req, res) => {




  Brand.max('brand_id').then(brandId => {
        //console.log("HOlaSeñorJesus", brandId);
       if (brandId != 0) {
         //console.log("Hello");
         var tempBrandId = brandId;
         rString = Number(tempBrandId.split("-")[1]);
         rString = rString + 1;

          switch (rString.toString().length) {
            case 1:
                params.brandId = "BRAND-000" + rString.toString()
              break;
            case 2:
               params.brandId = "BRAND-00" + rString.toString()
              break;
            case 3:
                params.brandId = "BRAND-0" + rString.toString()
              break;
            case expression:
                params.brandId = "BRAND-" + rString.toString()
              break;
            default:

          }
       }else{
        // console.log("hello else");
         params.brandId = "BRAND-0001";
       }


       Brand.create({
          brand_id: params.brandId,
           brand: req.body.brand,
           created_by: req.session.user,
           creation_date: req.body.creationDate,
           modification_date: req.body.modificationDate,
           status_id: '1'
       }).then(brand => {
        //  console.log(brand);
          res.json(true)
       })
     })

}

controller.deleteBrand = (req, res) => {

  Model.findOne({

  })

      Brand.update({
          status_id: 3
        },
          { where:
            {
              id: req.body.id
            }
      })
      .then( () => {
        res.json(true)
      })
}

controller.updateBrand = (req, res) => {
  Brand.update(
    {
      brand: req.body.brand,
      modification_date: req.body.modificationDate
    },
    {
      where:{
        id: req.body.id
      }
    }
  ).then(company => {
      res.json(true)
  })
}



module.exports = controller;

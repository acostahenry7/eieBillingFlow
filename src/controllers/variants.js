var db = require('../models');
var Variant = db.variant;
var Op = db.Sequelize.Op;

var controller = {}



controller.variants = (req, res) => {
    var view = {}
    view.title = "Variantes";
    view.parent = "Inventario /";
    view.user = req.session.user;
    view.status = [];

    res.render('variants', view)
}

controller.datafill = (req, res) => {
  Variant.findAll({
    where:{
      status_id: {
        [Op.ne]: 'STATUS-0003'
      }
    }
  })
    .then( variant => {
        console.log(variant);
        res.send(variant)
    })

}


controller.createVariant = (req, res)=> {
var params = {};

  Variant.max('variant_id').then(variantId => {
        //console.log("HOlaSeñorJesus", variantId);
       if (variantId != 0) {
         //console.log("Hello");
         var tempVariantId = variantId;
         rString = Number(tempVariantId.split("-")[1]);
         rString = rString + 1;

          switch (rString.toString().length) {
            case 1:
                params.variantId = "VARIANT-000" + rString.toString()
              break;
            case 2:
               params.variantId = "VARIANT-00" + rString.toString()
              break;
            case 3:
                params.variantId = "VARIANT-0" + rString.toString()
              break;
            case expression:
                params.variantId = "VARIANT-" + rString.toString()
              break;
            default:

          }
       }else{
        // console.log("hello else");
         params.variantId = "VARIANT-0001";
       }


       Variant.create({
          variant_id: params.variantId,
           variant_name: req.body.variant,
           created_by: req.session.user,
           creation_date: req.body.creationDate,
           modification_date: req.body.modificationDate,
           status_id: 'STATUS-0001',
           outlet_id: ""
       }).then(variant => {
        //  console.log(variant);
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

module.exports = controller;

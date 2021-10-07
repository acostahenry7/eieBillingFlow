
const db = require("../models");
const Status = db.status;
const Op = db.Sequelize.Op;
const Brand = db.brand;
const Model = db.model;

var controller = {};
var rString = 0;
var params = {};


controller.models = (req, res) => {
  var view = {};

  view.title = "Modelos";
  view.parent = "Configuración /";
  view.user = req.session.user;
  view.status = [];
  view.brands = []

  Brand.findAll(  {
      where:{
        status_id:{
          [Op.ne]: 3
        }
      }
    },
    {
      attributes:['brand']
  }).then(brands => {
     for(i=0; i<brands.length; i++){
        view.brands.push({brand_name: brands[i].dataValues.brand })
     }
  })
    //res.send(view)
  res.render('models', view)

}


controller.datafill = (req, res) => {
  Model.findAll({
     where: {
       status_id:{
         [Op.ne]: 3
       }
     }
  }).then(model => {
        //console.log("Mis Modelos",model);
      res.send(JSON.stringify(model))
  })
}

controller.createModel =  (req, res) => {

  Model.max('model_id').then(modelId => {
        //console.log("HOlaSeñorJesus", modelId);
       if (modelId != 0) {
         console.log("Hello");
         var tempModelId = modelId;
         rString = Number(tempModelId.split("-")[1]);
         rString = rString + 1;

          switch (rString.toString().length) {
            case 1:
                params.modelId = "MODEL-000" + rString.toString()
              break;
            case 2:
               params.modelId = "MODEL-00" + rString.toString()
              break;
            case 3:
                params.modelId = "MODEL-0" + rString.toString()
              break;
            case expression:
                params.modelId = "MODEL-" + rString.toString()
              break;
            default:

          }
       }else{
         console.log("hello else");
         params.modelId = "MODEL-0001";
       }


       Model.create({
           model_id: params.modelId,
           brand_id: req.body.brandId,
           model: req.body.model,
           created_by: req.session.user,
           creation_date: req.body.creationDate,
           modification_date: req.body.modificationDate,
           status_id: '1'
       }).then(model => {
          console.log(model);
          res.send(model)
       })
     })
}

controller.updateModel = (req, res) =>{
  Model.update(
    {
      model: req.body.model,
      brand_id: req.body.brandId,
      modification_date: req.body.modificationDate
    },
    {
      where:{
        id: req.body.id
      }
    }
  ).then(model => {
      res.json(true)
  })
}

controller.deleteModel = (req, res) => {
  console.log("Delete");
  Model.update({
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



//Other fuctions
controller.listBrands = (req, res) => {
  var arr = [];

  Brand.findAll(  {
      where:{
        status_id:{
          [Op.ne]: 3
        }
      }
    },
    {
      attributes:['brand' , 'brand_id']
  }).then(brands => {
    //  console.log("HEY", brands);
     for(i=0; i<brands.length; i++){
        arr.push(
          {
            brand_name: brands[i].dataValues.brand ,
            brand_id: brands[i].dataValues.brand_id
            }
          )
     }

    // console.log("HOLA ESTOY AQUI", arr);
     res.send(arr)
  })

}


module.exports = controller;

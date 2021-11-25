var controller = {}
var db = require('../models')
var Product = db.product;
var ProductType = db.productType;
var Brand = db.brand;
var Model = db.model;
var Op = db.Sequelize.Op;


controller.products = (req, res) => {
    var view = {}
    view.title = "Productos";
    view.parent = "Inventario /";
    view.user = req.session.user;
    view.status = [];

    res.render('products', view)
}

controller.datafill = (req, res) => {

  Product.findAll(
      {
        where: {
          status_id: {
            [Op.ne]: 'STAUTS-0003'
          }
        }
      }
    ).then(  products => {
        //console.log("hijafkdasafj;asfs");
          //var data = {}
          var data = products


            //console.log("WHY" , products[i].dataValues.product_type_id);
            ProductType.findAll(
              /*{
                where: {
                   product_type_id: {
                     [Op.eq]: products[i].dataValues.product_type_id
                   }
                }
              },*/
              {
                attributes: ['product_type_id','product_type']
              }
            ).then(productTypes => {
              for (p of products){

                for(pt of productTypes){
                      if(pt.dataValues.product_type_id == p.dataValues.product_type_id)

                      p.dataValues.product_type = pt.dataValues.product_type
                  }
              }
                /*for (i = 0 ;  i < products.length; i++){
                  data.productType.push(productType.dataValues.product_type)
                }*/

                console.log("Last", data);
                res.send(data)
            })


    })
}


async function getProductType(products){
  for (p of products){

    ProductType.findOne(
      {
        where: {
           product_type_id: {
             [Op.eq]: p.dataValues.product_type_id
           }
        }
      },
      {
        attributes: ['product_type']
      }
    ).then( productType => {
       //console.log(productType.dataValues.product_type);

        p.dataValues.product_type = productType.dataValues.product_type

        data.push(p)
        console.log("afjalkdj" ,data);
        //console.log(products);

    })

    console.log(data);

  }
    return data
}


controller.create = (req, res) => {
   console.log(req.body);


  Brand.findOne(
    {
      where: {
        brand_id: {
           [Op.eq]: req.body.brandId
        }
      }
    }
    ,
    {
      attributes: ['brand']
    }
  ).then( brand => {
    console.log(brand);

  Model.findOne(
    {
      where: {
         model_id: {
           [Op.eq]: req.body.modelId
         }
      }
    },
    {
      attributes: ['model']
    }
  ).then( model => {
    console.log(model.dataValues.model);
      Product.create({
         product_name: brand.dataValues.brand +  " " + model.dataValues.model,
         product_description: '',
         product_type_id: req.body.productTypeId,
         outlet_id: req.session.outlet_id,
         creation_date: req.body.creationDate,
         modification_date: req.body.modificationDate,
         status_id: '71803eef-3ff3-4c5b-a487-9670e308c3bf'
       })
       .then( product => {
         res.send(product)
       })
    })
})

}

module.exports = controller;

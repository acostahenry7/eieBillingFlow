//const db = require('../database');
//const client = db();
var controller = {};
var arr = [];
var params = {};

//client.connect()

const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;
const Outlet = db.outlet;
const Status = db.status;
const Country = db.country;


controller.outlets = async(req, res)=> {

  view = {}
  view.title = "Sucursales";
  view.parent = "Configuración /"
  view.user = req.session.user;
  view.status = [];
  view.country = [];
  //let rs =await client.query("select status_name from scheiebillingflow.status")

  Status.findAll({attributes:['status_name']}).then(status => {
      for(i=0 ; i < status.length; i++){
        switch (status[i].dataValues.status_name) {
          case "enabled":
              view.status.push({status_name: "Activo"})
            break;
          case "disabled":
              view.status.push({status_name: "Inactivo"})
            break;
          default:

        }
      }

  })

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
            view.country.push(
              {
                country_id: countries[i].dataValues.country_id,
                country_name: countries[i].dataValues.country_name
              }
            );
        }
        res.render("outlets" , view);
    })


}


controller.datafill = async(req, res) => {
  //console.log(db.outlet);
  //console.log("Hola");
  //var rs = await client.query('select * from scheiebillingflow.companies')
  Outlet.findAll({
    where:{
      status_id:{
        [Op.ne]: 'STATUS-0003'
      }
    }
  }).then(outlets => {
        //console.log(outlets);
        res.send(JSON.stringify(outlets))
  })
}

controller.createOutlet = (req, res) => {

   /* Outlet.max('outlet_id').then(outletId => {
        //console.log(outletId);
     if (outletId != 0) {
          //console.log("Hello");
          var tempOutletId = outletId;
          rString = Number(tempOutletId.split("-")[1]);
          rString = rString + 1;

           switch (rString.toString().length) {
             case 1:
                 params.outletId = "OUTLET-000" + rString.toString()
               break;
             case 2:
                params.outletId = "OUTLET-00" + rString.toString()
               break;
             case 3:
                 params.outletId = "OUTLET-0" + rString.toString()
               break;
             case expression:
                 params.outletId = "OUTLET-" + rString.toString()
               break;
             default:

           }
        }else{
          //console.log("hello else");
          params.outletId = "OUTLET-0001";
        }

*/

  Outlet.create({
        outlet_name: req.body.outletName,
        company_id: req.body.companyId,
        rnc: req.body.outletRnc,
        country: req.body.country,
        province_id: req.body.province,
        municipality_id: 'Santo Domingo Este',
       sector_id: req.body.sector,
        street_1: req.body.street1,
        street_2: req.body.street2,
        phones: req.body.phones,
        fax: req.body.fax,
        email: req.body.email,
        image:'image',
        creation_date: req.body.creationDate,
        modification_date: req.body.modificationDate,
        website: req.body.website,
        company_type_id: 'COMPTP-0001',
        status_id: 'STATUS-0001'
  })
  .then(outlet => {
    //console.log(company);
    res.json(true);
//  })

})

}

controller.updateOutlet = (req, res) => {
  Outlet.update(
    {
      outlet_name: req.body.outletName,
      rnc: req.body.outletRnc,
      company_id: req.body.companyId,
      website: req.body.website,
      country: req.body.country,
      province_id: req.body.province,
      municipality_id: req.body.municipality,
      sector_id: req.body.sector,
      street_1: req.body.street1,
      street_2: req.body.street2,
      phones: req.body.phones,
      fax: req.body.fax,
      email: req.body.email,
      modification_date: req.body.modificationDate
    },
    {
      where:{
        outlet_id: req.body.outletId
      }
    }
  ).then(Outlet => {
      res.json(true)
  })
}

controller.deleteOutlet = (req, res) => {
  Outlet.update({
      status_id: 'STATUS-0003' },
      { where: {
        outlet_id: req.body.outletId
      }
  })
  .then( () => {
    res.json(true)
  })

}


//Retrieving select data
controller.listCompanies = (req, res) => {

    var arr = [];

    Company.findAll({
      where: {
        status_id: {
          [Op.ne] : 'STATUS-0003'
        }
      }
    },
      {
        attributes: ['compnay_id','company_name']
      }
    ).then(companies => {
        for(i=0; i< companies.length; i++){
           arr.push({
              company_id: companies[i].dataValues.company_id,
              company_name: companies[i].dataValues.company_name
           })
        }

        res.send(arr)
    })
}

controller.getOutletsByCompId = (req, res) => {

  var arr = []

  Outlet.findAll({
    where: {
      company_id: {
        [Op.eq]: req.body.company_id
      },
      status_id: {
        [Op.ne]: "STATUS-0003"
      }
    }
  },{
    attributes: ['outlet_name']
  }).then(outlets => {
      for(i=0; i < outlets.length; i++ ){
        arr.push({
           outlet_name: outlets[i].dataValues.outlet_name
        })
      }
      console.log(arr);
      res.send(arr)
  })
}


module.exports = controller;

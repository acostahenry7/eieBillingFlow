//company//const db = require('../database');
//const client = db();
//hola

const db = require("../models");
const Company = db.company;
const Status = db.status;
const Op = db.Sequelize.Op;

var controller = {};
var params = {};
var rString = 0;


//console.log("hola");

//client.connect()
controller.companies = async(req, res) => {
  //console.log("My session:" , req.session);
  var view = {}
  view.title = "Grupos Empresariales";
  view.parent="Configuracion /";
  view.user = req.session.user;
  view.status = [];
  Company.findAll({attributes:['company_id']}).then(companyId => {
      view.id=companyId;
      //console.log(view.id);

      Status.findAll({attributes:['status_name']}).then(status => {
          for(i=0 ; i < status.length; i++){
            //console.log(status[i].dataValues.status_name);
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
          //console.log(view.status);
          res.render("companies" , view);
      })

  })

  //console.log("Session: ", req.session);

}

//Datafill
controller.datafill = async(req, res) => {
  Company.findAll({
    where:{
      status_id:{
        [Op.ne]: 'STATUS-0003'
      }
    }
  }).then(company => {
          //console.log(company);
        res.send(company)
  })

}


controller.createCompany = async(req, res) => {
  //console.log("Here We go");
  //console.log("Comapny Name: " + req.body);

 Company.max('company_id').then(companyId => {
       //console.log(companyId);
       if (companyId != 0) {
         //console.log("Hello");
         var tempCompanyId = companyId;
         rString = Number(tempCompanyId.split("-")[1]);
         rString = rString + 1;

          switch (rString.toString().length) {
            case 1:
                params.companyId = "COMP-000" + rString.toString()
              break;
            case 2:
               params.companyId = "COMP-00" + rString.toString()
              break;
            case 3:
                params.companyId = "COMP-0" + rString.toString()
              break;
            case expression:
                params.companyId = "COMP-" + rString.toString()
              break;
            default:

          }
       }else{
         //console.log("hello else");
         params.companyId = "COMP-0001";
       }


       //console.log("COMP ID" , params.companyId);
         Company.create({
               company_id: params.companyId,
               company_name: req.body.name,
               rnc: req.body.rnc,
               creation_date: req.body.creationDate,
               modification_date: req.body.modificationDate,
               status_id: req.body.status,
               company_type_id: 'COMPTP-0001'

         })
         .then(company => {
           //console.log(company);
           res.json(true);
         })
})



}




var currentId ;
controller.updateCompany = async(req, res) => {

  //console.log(req.body.companyId);
      Company.update(
        {
          company_name: req.body.name,
          rnc: req.body.rnc,
          modification_date: req.body.modification_date
        },
        {where: {
            id: req.body.companyId
        }}
      )
      .then(company => {
            res.json(true)
      })
}

controller.deleteCompany = async(req, res) => {



      Company.update({
          status_id: 'STATUS-0003' },
          { where: {
            id: req.body.id
          }
      })
      .then( () => {
        res.json(true)
      })



}



controller.enableCompany = (req, res) => {

  Company.update(
      { status_id: 'STATUS-0001' },
      { where: {
          company_id: req.body.companyId
        }
      }
    ).then(company => {
      //console.log(company);

      res.json(true)
    })


}

controller.disableCompany = (req, res) => {
  console.log("id" , req.body.companyId);
  Company.update(
      { status_id: 'STATUS-0002' },
      { where: {
          company_id: req.body.companyId
        }
      }
    ).then(company => {
      console.log("Company disabled", company);

      res.json(true)
    })


}






module.exports = controller;

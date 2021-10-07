const db = require('../database');
const client = db();
var controller = {};

client.connect()
controller.getModules = async (req, res)=> {
  console.log("Get Body" ,req.body);

switch (req.body.status) {
  case "Activo":
      req.body.status = "enabled"
    break;
    case "Inactivo":
        req.body.status = "disabled"
      break;
  default:

}

  var test = await client.query('select company_name, rnc, creation_date, modification_date, status_name \
                                from scheiebillingflow.companies\
                                join scheiebillingflow.status using(status_id)\
                                where lower(company_name) LIKE $1 AND lower(status_name) LIKE $2 AND status_name NOT LIKE $3' ,["%" + req.body.name.toLowerCase() + "%" ,
                                 "%" + req.body.status + "%", "deleted"])
  console.log(test.rows);

  res.json({rows: test.rows})
}


module.exports = controller;

const express = require('express');
const config = require('./server/config.js');
const db = require("./models");
const Op = db.Sequelize.Op;
const Role = db.role;
const Country = db.country;
const Province = db.province;
const Status = db.status;

const app = config(express())

//Initial Data
const sd = require('./server/starting-data')
const countriesSD = sd.countries
const provincesSD = sd.provinces




app.listen(app.get('port'), ()=> {
    console.log("Listening on port", app.get('port'));
})

//db.sequelize.sync();

db.sequelize.sync().then(()=> {
    initial();
});


var container = 0;
var counter;

Province.count().then(provincesQuantity => {
    counter = provincesQuantity;
})

function initial() {

    Role.count().then(rolesQt => {
        if (rolesQt < 3) {
          console.log("Loading Roles");
          Role.create({
            id: 1,
            name: "user"
          })

          Role.create({
            id: 2,
            name: "moderator"
          })

          Role.create({
            id: 3,
            name: "admin"
          })
        }else{
          console.log("Roles already loaded");
        }
    })


//console.log(municipalitiesSD.provinces.p148);
Country.count().then(countriesQuantity => {
    if (countriesQuantity >= 194){
      console.log("Countries already loaded");
    } else{
      for(i=0 ; i < countriesSD.length; i++){
        Country.create({
            country_id: countriesSD[i].country_id,
            country_name: countriesSD[i].country_name
        })
      }
    }
})

var a;
var countryId;
if (counter == 0 ){

for(i=0; i < provincesSD.length; i++) {

for( eachProvince=0; eachProvince < provincesSD[i].length; eachProvince++){
  console.log("Ok" + eachProvince);
  switch (i.toString().length) {
    case 1:
          countryId = 'COUNTRY-000'+ i;
      break;
    case 2:
          countryId = 'COUNTRY-00'+i;
      break;
    case 3:
          countryId = 'COUNTRY-0'+i;
      break;
    default:
  }
  switch (counter.toString().length) {
    case 1:
          provinceId = 'PROVINCE-000'+ counter;
      break;
    case 2:
          provinceId = 'PROVINCE-00'+ counter;
      break;
    case 3:
          provinceId = 'PROVINCE-0'+ counter;
      break;
    default:
  }

  Province.create({
    province_id: provinceId,
    country_id: countryId,
    province_name: provincesSD[i][eachProvince].province_name
  })

  //container += eachProvince
  counter++
}

//console.log(provincesSD[i].length);
container += provincesSD[i].length
  }

}
else{
  console.log("Provinces already loaded");
}



Status.count().then( statusQuantity => {
   if (statusQuantity == 0){
     Status.create({
        status_id: 'STATUS-0001',
        status_name: 'enabled',
        description: 'Set status to enabled'
     })

     Status.create({
        status_id: 'STATUS-0002',
        status_name: 'disabled',
        description: 'Set status to disabled'
     })

     Status.create({
        status_id: 'STATUS-0003',
        status_name: 'deleted',
        description: 'Set status to enabled'
     })
   }else{
     console.log("Status already loaded");
   }
})


//console.log(container);

//


}

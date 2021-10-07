const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicatedUsername = (req, res, next) => {
  console.log("Here:" + req.body.username);
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
      console.log(user);
      if (user){
        res.status(400).send({
            message: "Error! Duplicated User"
        });
        return;
      }
      next()
  })
}

checkRolesExisted = (req, res, next)=> {
  console.log("From is rol exist", req.body.username);
  if(req.body.roles){
    for(let i = 0; i<req.body.roles.length; i++){
      if (!ROLES.includes(req.body.roles[i])){
        res.status(400).send({
            message: "Failes role not exist: " + req.body.roles[i]
        })
        return;
      }
    }
  }
  next();
}

const verifySignUp = {
  checkDuplicatedUsername: checkDuplicatedUsername,
  checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp;

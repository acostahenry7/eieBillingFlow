const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  //let token = req.headers["x-access-token"];
  console.log(req.session.token);
  let token = req.session.token

  if (!token){
    /*return res.status(403).send({
      message: "No token provided"
    })*/
    return res.redirect('/');
  }

  jwt.verify(token, config.secret, (err, decoded) => {
      if (err){
        console.log(err);
        return res.status(401).send({
            message: "Unauthorized!"
        })
      }
      req.userId = decoded.id;
      next();
  })
}

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        console.log(roles[i]);
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isAccountingOrAdmin= (req, res, next) => {
  User.findByPk(req.userId).then( user => {
      user.getRoles().then(roles =>{
          for(let i = 0; i < roles.length; i++){
            if(roles[i].name === "accounting" ){
              next();
              return
            }

            if (roles[i].name === "admin"){
              next();
              return;
            }
          }

          res.status(403).send({
             message: "Require module Accounting!"
          })
      })
  })
}

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles(roles => {
      for (i = 0; i < roles.length; i++){
          if (roles[i].name === "moderator"){
            next();
            return;
          }

          if (roles[i].name === "admin"){
            next();
            return;
          }

          res.status(403).send({
            message: "Require Moderator or Admin Role"
          })
      }
    })
  })
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isAccountingOrAdmin: isAccountingOrAdmin
}

module.exports = authJwt;

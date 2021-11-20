const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Outlet = db.outlet;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var sess;

exports.signup = (req, res)=>{
  console.log("cont: " + req.body.username);
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      outlet_id: req.body.outlet_id
  })
  .then(user => {
      if(req.body.roles){
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles) .then(() => {
              res.send({message: "User was registered successfully!"});
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({message: "User was registered successfully!"})
        });
      }
  })
  .catch(err => {
      res.status(500).send({message: err.message});
  });
   console.log("User created!");
   res.send(202)
};



exports.signin = (req, res) => {
  var cmpTp;
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
      if(!user){
        return res.status(404).send({message: "User not found"})
      }

      var passwordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if(!passwordValid){
        return res.status(404).send({
            accessToken: null,
            message: "Invalid Password!"
        })
      }

      var token = jwt.sign({id: user.id}, config.secret, {
          //expiresIn: '1h' //24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
          for(i=0; i < roles.length; i++){
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          console.log("Employee's Outlet", user.outlet_id );
          req.session.token = token;
          req.session.user = user.username;
          req.session.outlet_id = user.outlet_id;
          Outlet.findOne({attributes: ['company_type_id']},{
            where: {
               outlet_id: user.outlet_id
            }
          }).then(cti => {



              res.status(200).send({
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                companyTypeId: cti.dataValues.company_type_id
                //sessionId: sess.token
              });
          })

          console.log("TESTING" ,cmpTp );

      });
  })
  .catch(err =>{
      res.status(500).send({message: err.message});
  });
};


exports.signout = (req, res) => {
  req.session.token = "";
  res.send(req.session)
}

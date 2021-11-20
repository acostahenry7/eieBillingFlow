//const uuid = require('uuidv4');

module.exports = (sequelize, Sequelize) => {
   const User = sequelize.define("users" , {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      outlet_id: {
        type: Sequelize.STRING
      }
   },{
     schema: 'scheiebillingflow'
   });

   return User;
}

module.exports = (sequelize, Sequelize) => {
   const Variant = sequelize.define("variants" , {
      variant_id: {
        type: Sequelize.STRING,
        //defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      variant_name: {
        type: Sequelize.STRING
      },
      creation_date: {
        type: Sequelize.STRING
      },
      modification_date: {
        type: Sequelize.STRING
      },
      outlet_id: {
        type: Sequelize.STRING
      },
      status_id: {
        type: Sequelize.STRING
      }
   },{
     freezeTableName: true,
     schema: 'scheiebillingflow',
     timestamps: false
   });

   return Variant;
}

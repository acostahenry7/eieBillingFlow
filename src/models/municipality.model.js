module.exports = (sequelize, Sequelize) => {
   const Municipality = sequelize.define("municipalities", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      municipality_id:{
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.STRING
      },
      municipality_name: {
        type: Sequelize.STRING
      }
   },{
     schema: 'scheiebillingflow',
     timestamps: false
   });
   return Municipality;
}

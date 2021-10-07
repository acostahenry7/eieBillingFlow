module.exports = (sequelize, Sequelize) => {
   const Province = sequelize.define("provinces", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      province_id: {
        type: Sequelize.STRING
      },
      country_id: {
        type: Sequelize.STRING
      },
      province_name: {
        type: Sequelize.STRING
      }
   },{
     schema: 'scheiebillingflow',
     timestamps: false
   });
   return Province;
}

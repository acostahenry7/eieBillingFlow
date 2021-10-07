module.exports = (sequelize, Sequelize) => {
   const Country = sequelize.define("countries", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      country_id: {
        type: Sequelize.STRING
      },
      country_name: {
        type: Sequelize.STRING
      }
   },{
     schema: 'scheiebillingflow',
     timestamps: false
   });
   return Country;
}

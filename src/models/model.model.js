module.exports = (sequelize, Sequelize) => {
   const Model = sequelize.define("models" , {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      model_id: {
        type: Sequelize.STRING
      },
      brand_id: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      creation_date: {
        type: Sequelize.STRING
      },
      modification_date: {
        type: Sequelize.STRING
      },
      status_id: {
        type: Sequelize.INTEGER
      },
      outlet_id: {
        type: Sequelize.STRING
      }
   },{
     schema: 'scheiebillingflow',
     timestamps: false
   });

   return Model;
}

module.exports = (sequelize, Sequelize) => {
   const Status = sequelize.define("status" , {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      status_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
   },{
     freezeTableName: true,
     schema: 'scheiebillingflow',
     timestamps: false
   });

   return Status;
}

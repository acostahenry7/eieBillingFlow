module.exports = (sequelize, Sequelize) => {
   const Company = sequelize.define("companies" , {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      company_id: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      rnc: {
        type: Sequelize.STRING
      },
      creation_date: {
        type: Sequelize.DATE
      },
      modification_date: {
        type: Sequelize.DATE
      },
      status_id: {
        type: Sequelize.STRING
      },
      company_type_id: {
        type: Sequelize.STRING
      }
   },{
     schema: 'scheiebillingflow',
     timestamps: false
   });

   return Company;
}

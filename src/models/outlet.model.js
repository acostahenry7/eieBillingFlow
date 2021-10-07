module.exports = (sequelize, Sequelize) => {
   const Outlet = sequelize.define("outlets" , {
      outlet_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      outlet_name: {
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.STRING
      },
      rnc: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.STRING
      },
      municipality_id: {
        type: Sequelize.STRING
      },
      sector_id: {
        type: Sequelize.STRING
      },
      street_1: {
        type: Sequelize.STRING
      },
      street_2: {
        type: Sequelize.STRING
      },
      phones: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      creation_date: {
        type: Sequelize.STRING
      },
      modification_date: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      company_type_id: {
        type: Sequelize.STRING
      },
      status_id: {
        type: Sequelize.STRING
      }
   },{
     schema: 'scheiebillingflow',
     timestamps: false
   });

   return Outlet;
}

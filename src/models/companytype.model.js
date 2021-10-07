module.exports = (sequelize, Sequelize) => {
    const CompanyType = sequelize.define("company_types" , {
        company_type_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        company_type: {
            type: Sequelize.STRING
        },
        creation_date: {
            type: Sequelize.STRING
        },
        modification_date: {
            type: Sequelize.STRING
        },
        status_id: {
            type: Sequelize.STRING
        }
    }, {
      schema: 'scheiebillingflow',
      timestamps: false
    })

    return CompanyType
}

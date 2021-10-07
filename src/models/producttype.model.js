module.exports = (sequelize, Sequelize) => {
  const ProductType = sequelize.define("product_types", {
    product_type_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    product_type: {
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
  },
  {
    schema: 'scheiebillingflow',
    timestamps: false
  })

  return ProductType
}

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    product_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: Sequelize.STRING
    },
    product_description: {
      type: Sequelize.STRING
    },
    product_type_id: {
      type: Sequelize.UUID
    },
    outlet_id: {
      type: Sequelize.UUID
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
  },
  {
    schema: 'scheiebillingflow',
    timestamps: false
  })

  return Product
}

module.exports = (sequelize, Sequelize) => {
    const ProductDetails = sequelize.define('product_details' , {
      product_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      chasis: {
        type: Sequelize.STRING
      },
      registration_number: {
        type: Sequelize.STRING
      },
      brand_id: {
        type: Sequelize.UUID
      },
      condition: {
        type: Sequelize.STRING
      },
      model_id: {
        type: Sequelize.UUID
      },
      provider_id: {
        type: Sequelize.UUID
      },
      type_id: {
        type: Sequelize.UUID
      },
      color: {
        type: Sequelize.STRING
      },
      plate: {
        type: Sequelize.STRING
      },
      vehicle_status: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      fuel: {
        type: Sequelize.STRING
      },
      edition: {
        type: Sequelize.STRING
      },
      engine: {
        type: Sequelize.STRING
      },
      odometer: {
        type: Sequelize.STRING
      },
      cilinders: {
        type: Sequelize.INTEGER
      },
      transmition_type: {
        type: Sequelize.STRING
      },
      mileage: {
        type: Sequelize.STRING
      },
      traction: {
        type: Sequelize.STRING
      },
      passengers: {
        type: Sequelize.INTEGER
      },
      doors: {
        type: Sequelize.STRING
      },
      inner_color:  {
        type: Sequelize.STRING
      }
    },{
      schema: 'scheiebillingflow',
      timestamps: false
    })

    return ProductDetails
}

const config = require('../server/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.status = require("../models/status.model.js")(sequelize, Sequelize);
db.company = require("../models/company.model.js")(sequelize, Sequelize);
db.companyType = require("../models/companytype.model.js")(sequelize, Sequelize);
db.outlet = require("../models/outlet.model.js")(sequelize, Sequelize);
db.brand = require("../models/brand.model.js")(sequelize, Sequelize);
db.model = require("../models/model.model.js")(sequelize, Sequelize);
db.variant = require("../models/variant.model.js")(sequelize, Sequelize);
db.productType = require("../models/producttype.model.js")(sequelize, Sequelize);
db.provider = require("../models/provider.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.productDetails = require("../models/productdetails.model.js")(sequelize, Sequelize);

db.country = require("../models/country.model.js")(sequelize, Sequelize);
db.province = require("../models/province.model.js")(sequelize, Sequelize);
db.municipality = require("../models/municipality.model.js")(sequelize, Sequelize);

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
})

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
})

db.ROLES = ["user", "admin", "moderator", "accounting"]

module.exports = db;

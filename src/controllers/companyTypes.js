
const db = require('../models')
var CompanyType = db.companyType
var Op = db.Sequelize.Op
var controller = {}

controller.createCompanyType = (req, res) => {
    CompanyType.create({
        company_type: req.body.companyType,
        creation_date: req.body.creationDate,
        modification_date: req.body.modificationDate,
        status_id: 'STATUS-0001'
    })
    .then(companyType => {
        res.send("Company type created!")
    })
}


module.exports = controller

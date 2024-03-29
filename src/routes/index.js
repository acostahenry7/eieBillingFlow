const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifySignUp } = require("../middleware")
const authController = require("../controllers/auth.controller");
const accessController = require("../controllers/user.controller");
const { authJwt } = require("../middleware");
const companyController = require('../controllers/companies.js');
const companyTypeController = require('../controllers/companyTypes.js');
const brandsController = require('../controllers/brands.js');
const modelsController = require('../controllers/models.js');
const productTypesController = require('../controllers/productTypes');
const productsController = require('../controllers/products.js');
const variantsController = require('../controllers/variants.js');
const providersController = require('../controllers/providers.js')
const stockController = require('../controllers/stockcontrol.js')

//General Modules Import
const countriesController = require('../controllers/countries.js')
const provincesController =  require("../controllers/provinces.js");
const municipalitiesController = require("../controllers/municipalities.js")

//const datafillController = require('../controllers/datafill.js')

const outletController = require('../controllers/outlets.js')

module.exports = (app , storage, cache) =>{


  /*router.get('/cotizaciones' , (req, res) => {
      res.render('dashboard')
  })

    router.get('/dashboard' , (req, res) => {
        var view = {}
        view.title = "Dashboard"
        res.render('home' , view)
    })

    router.get('/companies' , companyController.companies);
    //router.get('/datafill/:companyName/:companyStatus' , datafillController.getModules);
    router.post('/datafill' , datafillController.getModules);

    //Companies
    router.post('/companies/create' , companyController.createCompany);
    router.post('/companies/update' , companyController.updateCompany);
    router.post('/companies/delete' , companyController.deleteCompany);
    router.post('/companies/enable' , companyController.enableCompany);
    router.post('/companies/disable' , companyController.disableCompany);

    //Outlets
    router.get('/outlets' , outletController.outlets);
    router.get('/outlets/datafill' , outletController.datafill);*/
   app.use(function(req, res, next){
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token , Origin, Content-Type, Accept"
        );
        next();
    });


    router.post("/api/auth/signup",
    [
      verifySignUp.checkDuplicatedUsername,
      verifySignUp.checkRolesExisted
    ],
    authController.signup);

      router.post("/api/auth/signin", authController.signin);
      //console.log("klklklk:" , authController.signin);
      router.get("/api/auth/signout", authController.signout);



     router.get("/api/test/all", accessController.allAccess);

     router.get(
    "/api/test/user",
    [authJwt.verifyToken],
    accessController.userBoard
  );

  router.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    accessController.moderatorBoard
  );

  router.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    accessController.adminBoard
  );



  //login
  router.get('/login', (req, res) => {

      res.render('login', {
        layout: false
      })
  })

  router.get('/' , (req, res) => {
      res.redirect('/login')
  })
  //Dashboard
  router.get('/dashboard' ,authJwt.verifyToken  , (req, res) => {
      var view = {}
      view.title = "Dashboard"
      view.user = req.session.user;
      res.render('home' , view)
  })


  //------------------------Configuration Module--------------------------------


  //companies
  router.get('/companies' , authJwt.verifyToken, authJwt.isAccountingOrAdmin ,companyController.companies);
  router.get('/companies/datafill', companyController.datafill);
  router.post('/companies/create' , companyController.createCompany);
  router.post('/companies/update' , companyController.updateCompany);
  router.post('/companies/delete' , companyController.deleteCompany);
  router.post('/companies/enable' , companyController.enableCompany);
  router.post('/companies/disable' , companyController.disableCompany);

  //Company Types
  router.post('/companytypes/create', companyTypeController.createCompanyType)


  //Outlets
  router.get('/outlets' ,/*authJwt.verifyToken, authJwt.isAccountingOrAdmin, */ outletController.outlets);
  router.get('/outlets/datafill' , outletController.datafill);
  router.get('/outlets/companieslist', outletController.listCompanies);
  router.post('/outlets/create',outletController.createOutlet);
  router.post('/outlets/update',outletController.updateOutlet);
  router.post('/outlets/delete' , outletController.deleteOutlet);

  //Brands
  router.get('/brands', authJwt.verifyToken, brandsController.brands);
  router.get('/brands/datafill', brandsController.datafill);
  router.post('/brands/create' , brandsController.createBrand);
  router.post('/brands/update', brandsController.updateBrand)
  router.post('/brands/delete', brandsController.deleteBrand);

  //Models
  router.get('/models', authJwt.verifyToken, modelsController.models)
  router.get('/models/datafill', modelsController.datafill);
  router.get('/models/brandlist' , modelsController.listBrands)
  //router.get('/models/modellist', modelsController.listModels)
  router.post('/models/delete', modelsController.deleteModel)
  router.post('/models/create' , modelsController.createModel)
  router.post('/models/update', modelsController.updateModel)


  //Product Types
  router.get('/producttypes', productTypesController.productTypes)
  router.get('/producttypes/datafill', productTypesController.datafill)
  router.post('/producttypes/create', productTypesController.createProductType)
  router.post('/producttypes/delete', productTypesController.deleteProductType)
  router.post('/producttypes/update', productTypesController.updateProductType)


  //Prodcuts
  router.get('/products', authJwt.verifyToken ,productsController.products)
  router.get('/products/datafill', productsController.datafill)
  router.post('/products/create' ,  productsController.create)
  router.post('/products/delete' , productsController.delete)

  router.get('/cotizaciones' , (req, res) => {
      //res.render('dashboard')
      //res.redirect("dashboard")

  })

  //Stockcontrol
  router.get('/stockcontrol', stockController.stockcontrol)

  //Providers
  router.get('/providers', providersController.providers)
  router.get('/providers/datafill', providersController.datafill)
  router.post('/providers/create', providersController.create)
  router.post('/providers/update', providersController.update)
  router.post('/providers/delete', providersController.delete)



  //Variants
  router.get('/variants', variantsController.variants)
  router.get('/variants/datafill', variantsController.datafill)
  router.post('/variants/create' , variantsController.createVariant);



  //-----------------------General Modules--------------------------------------

  var uploads = multer({storage: storage}).array('files', 10)
  var tempUploads = multer({storage: cache}).array('files', 10)

  //Images handlers
  app.post('/upload' , (req, res, file) => {

      uploads(req, res, function(err){
          req.session.user
          if (err){
            return res.send(err)
          }
          res.send("done")
      })
  })

  app.post('/temp', (req, res, file) => {
      tempUploads(req, res, function(err) {
          if (err) {
             return res.send(err)
          }
          res.send("Done!")
      })
  })



  //Provinces
  router.get('/countries/list', countriesController.countries )
  router.post('/outlets/list', outletController.getOutletsByCompId)
  router.post('/provinces/list', provincesController.getProvinces)
  router.post('/municipalities/list', municipalitiesController.getMunicipalities)

    app.use(router)
}

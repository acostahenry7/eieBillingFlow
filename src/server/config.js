
const exphbs = require('express-handlebars')
const path = require('path');
const routes = require('../routes/index.js')
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs')
//const flash = require('connect-flash');



var corsOptions = {
  origin: "*"
}



module.exports = app =>{

    //Listenin Port
    app.set('port', process.env.PORT || 3001)

    //Views
    app.set('views' , path.join(__dirname, "../views"))

    app.engine('.hbs' , exphbs({
      defaultLayout: 'main',
      partialsDir: path.join(app.get('views'), 'partials'),
      layoutsDir:path.join(app.get('views'),'layouts'),
      extname:'.hbs'
    }))
    app.set('view engine', '.hbs');

    //Middlewares
    app.use(session({secret: "eiesecret"}));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors(corsOptions))

    var storage = multer.diskStorage({

        destination: function(req, file, callback) {
           var storagePath = "OUTLET-0003"
           var dir = path.join(__dirname, '../public/uploads/' + storagePath)

           if(!fs.existsSync(dir))
           {
             fs.mkdirSync(dir)
           }
           callback(null, dir)
        },

        filename: function (req, file, callback){
            console.log(req.session.user);
            var filename = file.originalname.substring(0 , file.originalname.lastIndexOf("."))
            var fileExt = file.originalname.substring(file.originalname.lastIndexOf(".") , file.originalname.lenght)
            var d = new Date()
            var date = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds()


            var fullname = filename + date + fileExt

            callback(null, fullname)
        }
    })

    //Routes
    routes(app, storage)
    //require('./app/routes/index')(app);
    //require('./app/routes/user.routes')(app);
    app.use('/public', express.static(path.join(__dirname, '../public')))

    return app;
}

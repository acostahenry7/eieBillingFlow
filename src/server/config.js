
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
           var dir = path.join(__dirname, '../public/uploads')

           if(!fs.existsSync(dir))
           {
             fs.mkdirSync(dir)
           }
           callback(null, dir)
        },

        filename: function (req, file, callback){
            callback(null, file.originalname)
        }
    })


    /*app.use(multer({
      dest: path.join(__dirname, 'public/uploads')
    }).single('image'))*/

    //Routes
    routes(app, storage)
    //require('./app/routes/index')(app);
    //require('./app/routes/user.routes')(app);
    app.use('/public', express.static(path.join(__dirname, '../public')))

    return app;
}

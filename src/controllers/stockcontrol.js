
var controller = {}


controller.stockcontrol = (req, res) => {

   var view = {}
   view.title = "Control de almacen"
   //view.parent = 
   res.render('stockcontrol', view)

}

module.exports = controller

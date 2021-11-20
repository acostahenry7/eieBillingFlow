
$(document).ready( () => {

    $('#brands_form').on('submit', (e) => {
        e.preventDefault()
    })

    var arr = [];
    var params = {}


//----------------------------Table Definition----------------------------------

  var table = $('#brands_dataTable').DataTable({
      //serverSide: true,
      responsive: true,
      colReorder: true,
      "language": {
          "loadingRecords": '<div id="bf_spinner" class="spinner-border text-primary mt-4" role="status">\
            <span class="sr-only">Loading...</span>\
        </div>'
      },
      //stateSave: true,
      dom: 'Blrtip',
       ajax: {
         url:'/brands/datafill',
         type: 'GET',
         dataSrc: ""
       },
         columns: [
           { data: "id"},
           { data : "brand_id"},
           { data : "brand"},
           { data : "created_by"},
           { data : "creation_date"},
           { data : "modification_date"},
           {data: null,
             "render": function(data){

               switch (data.status_id) {
                case 1:
                    arr.eyeClass = "fas fa-eye";
                    arr.eyeTitle = "Inactivar";
                   break;
                case 2:
                    arr.eyeClass = "fas fa-eye-slash";
                    arr.eyeTitle = "Activar";
                  break;
                 default: //
               }

               return `<a style="cursor: pointer;  text-decoration: none" class="edit text-primary fas fa-edit"></a>\
               <a style="cursor: pointer; text-decoration: none" class="delete ml-3 text-danger fas fa-trash" ></a>`
               //<a style="cursor: pointer; text-decoration: none" title=${arr.eyeTitle} class="disable ml-3 text-secondary ${arr.eyeClass}"></a>
             }
           }
         ],
         "language": {
             "loadingRecords": '<div id="bf_spinner" class="spinner-border text-primary" role="status">\
               <span class="sr-only">Loading...</span>\
           </div>',
           "zeroRecords" : "No se encontraron registros",
           "infoEmpty":      "Mostrando 0 hasta 0 de 0 Registros",
           "info" : "Mostrando _START_ hasta _END_ de _TOTAL_ Registros",
           "paginate": {
               "next":       "Siguiente",
               "previous":   "Anterior"
           },
           "lengthMenu": "Mostrar _MENU_ registros"
         },
         "columnDefs" : [
           {
             "targets" : [0],
             "visible" : false
           }
         ]
})



//----------------------------Searching Options---------------------------------

//Refresh datatable
setInterval( function () {
 table.ajax.reload(null, false );
}, 20000 );





//----------------------------Button's Actions----------------------------------



//---------------------------Create/Update Button-------------------------------
  $('#brandsForm_create_btn').on('click', () => {
    var data;




    console.log($('#brands_dataTable tbody th'));

    if($('#brandsForm_create_btn').text().trim() == "Crear"){
      //Creation Code
          data = {
            brand: $('#brand_name').val(),
            creationDate: todayDate(),
            modificationDate: todayDate()
          }

          console.log($('#brand_name').val());
          $.ajax({
            type: 'post',
            url: '/brands/create',
            data: data,
            success: function(data){
              table.ajax.reload(null, false)
              $('#brandsModalForm').modal("hide");


            },

            complete: function(){
              $.ajax({
                type: 'GET',
                url: '/models/brandlist',
                success: function(data){
                  $('#model_brand_select').empty();
                  $('#products_brand_select').empty()
                  for (b of data) {
                    console.log(b.brand_name);
                    $('#model_brand_select').append(new Option(b.brand_name, b.brand_id))
                    $('#products_brand_select').append(new Option(b.brand_name, b.brand_id))
                  }
                }
              })

            }
          })
        }else {

          //Modification Code
          console.log(params.id);


          data = {
            id: params.id,
            brand: $('#brand_name').val(),
            modificationDate: todayDate()

          }

          $.ajax({
            type: 'POST',
            url: '/brands/update',
            data: data,
            success: function(msg){
              console.log(msg);
              table.ajax.reload(null, false)
              $('#createdWarningModal_title_1').text(`La Marca ${params.brand} ha sido actualizada a `)
              $('#createdWarningModal_title_2').text($('#brand_name').val())
              $('#createdWarningModal_title_3').text(" con exito!")
              $('#createdWarningModal').modal()
              $('#brandsModalForm').modal("hide")
            }
          })

        }
    })



//-----------------------------Update Button------------------------------------
  $('#brands_dataTable tbody').on('click', 'a.edit', function() {


      console.log($(this));
      var arr = table.row($(this).parents("tr")).data();

      if($(window).width() < 768){
         arr = table.row($(this)).data()
        console.log(arr);
      }

      console.log($('#brandsModalTitle').text());
      $('#brandsModalTitle').text("Actualizar Marca")
      $('#brandsForm_create_btn').text("Actualizar")
      $('#brandsModalForm').modal()
      $('#brand_name').val(arr.brand)

      params = arr;
  })


//-----------------------------Delete Button------------------------------------
  $('#brands_dataTable tbody').on( 'click', 'a.delete', function () {
      console.log(table.row().data());
      console.log($(this).parents("tr"));

      var arr = table.row($(this).parents("tr")).data();

      if($(window).width() < 768){
         arr = table.row($(this)).data()
        //console.log(arr);
      }

      $('#removingConfirmationModal_title_1').text("La Marca ")
      $('#removingConfirmationModal_title_2').text(arr.brand)
      $('#removingConfirmationModal_title_3').text(" será eleminada. ¿Desea Continuar?")

      $('#removingConfirmationModal').modal()

      $('#removingConfirmationModal_yes_btn').on('click', () => {
        $.ajax({
          type:'POST',
          url: '/brands/delete',
          data: {
            id: arr.id
          },
          success: function(msg){
            table.ajax.reload(null, false);
          }
        })

      })


  })


//-----------------------------Refresh Button-----------------------------------
$('#brand_form_refresh_btn').on('click', () => {
     table.ajax.reload(null, false );
})




//----------------------------Search Options------------------------------------
//Search by name
 $('#brand_form_name_input').on( 'keyup', function () {
     table.search(this.value).draw();
     table.state.save();

 });


//-----------------------Actions on Modal Events--------------------------------


//----------------------------On Form Close-------------------------------------
$('#brandsModalForm').on('hidden.bs.modal', () => {
    $('#brand_name').val("")
    $('#brandsModalTitle').text("Crear Marca")
    $('#brandsForm_create_btn').text("Crear")
})


})

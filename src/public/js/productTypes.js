var arr = [];
var params = [];

$(document).ready( () => {


  var table = $('#product_types_dataTable').DataTable({
      //serverSide: true,
      responsive: true,
      colReorder: true,
      //stateSave: true,
      dom: 'Blrtip',
       ajax: {
         url:'/producttypes/datafill',
         type: 'GET',
         dataSrc: ""
       },
         columns: [
           { data : "product_type_id"},
           { data : "product_type"},
           //{ data : "created_by"},
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
                 default:
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




//--------------------------Create Button---------------------------------------

  $('#productTypesForm_create_btn').on('click', ()=>{

      var data = {}

    if($('#productTypesForm_create_btn').text().trim() == "Crear"){
        data = {
          productType: $('#productType_name').val(),
          creationDate: todayDate(),
          modificationDate: todayDate()
        }

        $.ajax({
          type: 'POST',
          url: '/producttypes/create',
          data: data,
          success:  function(createdItem) {
              table.ajax.reload();
              $('#createdWarningModal_title_1').text(`El producto `)
              $('#createdWarningModal_title_2').text(data.productType)
              $('#createdWarningModal_title_3').text(" ha sido creado con exito!")
              $('#createdWarningModal').modal()
              $('#productTypesModalForm').modal("hide")

              $.ajax({
                type: 'GET',
                url: '/producttypes/datafill',
                success: function(data){
                  $('#products_productType_select').empty()
                  for(b of data){

                     $('#ct1_productType_select').append(new Option(b.product_type, b.product_type_id))
                  }

                  $('#ct1_productType_select').val(createdItem.product_type_id)
                }
              })

          }
        })

      } else {
        console.log("hey hey");
          data = {
            product_type_id: params.product_type_id,
            productType: $('#productType_name').val(),
            modificationDate: todayDate()
          }

          $.ajax({
            type: 'POST',
            url: '/producttypes/update',
            data: data,
            success:  function(msg) {
                table.ajax.reload();
                $('#createdWarningModal_title_1').text(`El Modelo`)
                $('#createdWarningModal_title_2').text(data.productType)
                $('#createdWarningModal_title_3').text("ha sido actualizado con exito!")
                $('#createdWarningModal').modal()
                $('#productTypesModalForm').modal("hide")
                console.log(msg);
            }
          })

      }

  })

//--------------------------Delete Button---------------------------------------

  $('#product_types_dataTable tbody').on('click' , 'a.delete', function() {

          var arr = table.row($(this).parents("tr")).data();

          if($(window).width() < 768){
             arr = table.row($(this)).data()
            console.log(arr);
          }

          $('#removingConfirmationModal_title_1').text("El Tipo de producto ")
          $('#removingConfirmationModal_title_2').text(arr.product_type)
          $('#removingConfirmationModal_title_3').text(" será eleminada. ¿Desea Continuar?")

          $('#removingConfirmationModal').modal()

          $('#removingConfirmationModal_yes_btn').on('click', () => {
            $.ajax({
              type:'POST',
              url: '/producttypes/delete',
              data: {
                productTypeId: arr.product_type_id
              },
              success: function(msg){
                table.ajax.reload(null, false);
              }
            })

          })
  })


//--------------------------Update Button---------------------------------------
  $('#product_types_dataTable tbody').on('click', 'a.edit' , function() {
    if($(window).width() < 768){
       arr = table.row($(this)).data()
      console.log(arr);
    }

    arr = table.row($(this).parents("tr")).data()
    console.log(arr);
    //console.log($('#brandsModalTitle').text());
    $('#productTypesModalTitle').text("Actualizar Tipo de Producto")
    $('#productTypesForm_create_btn').text("Actualizar")
    $('#productTypesModalForm').modal()
    $('#productType_name').val(arr.product_type)

    params = arr;



  })

})

//----------------------------Table Definition----------------------------------

$(document).ready( () => {



  var arr = [];
  var params = [];

  $('#models_form').on('submit', (e) => {
      e.preventDefault()
  })

  var table = $('#models_dataTable').DataTable({
      //serverSide: true,
      responsive: true,
      colReorder: true,
      //stateSave: true,
      dom: 'Blrtip',
       ajax: {
         url:'/models/datafill',
         type: 'GET',
         dataSrc: ""
       },
         columns: [
           { data : "id"},
           { data : "model_id"},
           { data : "model"},
           { data : "brand_id"},
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


  $.ajax({
    type: 'GET',
    url: '/models/brandlist',
    success: function(data){
      for (b of data) {
        //console.log(b);
        $('#model_brand_select').append(new Option(b.brand_name, b.brand_id))
      }
    }
  })


//Create button
$('#modelsForm_create_btn').on('click', ()=>{
    console.log("hello" , $('#modelsForm_create_btn').text().trim() );
    console.log("hello");
    var data = {}

  if($('#modelsForm_create_btn').text().trim() == "Crear"){
      data = {
        brandId: $('#model_brand_select option:selected').val(),
        model: $('#model_name').val(),
        creationDate: todayDate(),
        modificationDate: todayDate()
      }

      $.ajax({
        type: 'POST',
        url: '/models/create',
        data: data,
        success:  function(createdItem) {

            table.ajax.reload();
            $('#createdWarningModal_title_1').text(`El Modelo ${data.model} ha sido creado `)
            $('#createdWarningModal_title_2').text("")
            $('#createdWarningModal_title_3').text(" con exito!")
            $('#createdWarningModal').modal()
            $('#modelsModalForm').modal("hide")
            $('#products_model_select').empty()

            $.ajax({
              type: 'GET',
              url: '/models/datafill',
              success: function(bckData){
                bckData = JSON.parse(bckData)
                $('#products_model_select').empty()
                for(b of bckData){
                   $('#products_model_select').append(new Option(b.model, b.model_id))
                }
                $('#products_model_select').val(createdItem.model_id)
              }
            })



        }
      })

    } else {
      console.log("hey hey");
        data = {
          id: params.id,
          brandId: $('#model_brand_select option:selected').val(),
          model: $('#model_name').val(),
          modificationDate: todayDate()
        }

        $.ajax({
          type: 'POST',
          url: '/models/update',
          data: data,
          success:  function(msg) {
              table.ajax.reload();
              $('#createdWarningModal_title_1').text(`El Modelo ${data.model} ha sido actualizado `)
              $('#createdWarningModal_title_2').text("")
              $('#createdWarningModal_title_3').text(" con exito!")
              $('#createdWarningModal').modal()
              $('#modelsModalForm').modal("hide")
              console.log(msg);
          }
        })

    }

})


//Update Button
$('#models_dataTable tbody').on('click', 'a.edit', function() {

    console.log(table.row(0));
    var arr = table.row($(this).parents("tr")).data();

    if($(window).width() < 768){
       arr = table.row($(this)).data()

    }

    console.log(arr);
    //console.log($('#brandsModalTitle').text());
    $('#modelsModalTitle').text("Actualizar Modelo")
    $('#modelsForm_create_btn').text("Actualizar")
    $('#modelsModalForm').modal()
    $('#model_brand_select').val(arr.brand_id)
    $('#model_name').val(arr.model)


    params = arr;
})


//------------------------------------------------------------------------------
//Search by name
 $('#brand_form_name_input').on( 'keyup', function () {
     table.search(this.value).draw();
     table.state.save();

 });


 //Search by name
  $('#model_form_name_input').on( 'keyup', function () {
      table.search(this.value).draw();
      table.state.save();

  });

//---------------------------------Events---------------------------------------

$('#model_brand_creation').on('click', (e) =>{
  console.log(e);
  e.preventDefault();
  $('#brandsModalForm .modal-backdrop').remove()
  $('#brandsModalForm').css('position', 'absolute')
  $('#brandsModalForm').css('z-index', 9999)
  $('#brandsModalForm').modal()
})

$('#modelsModalForm').on('hidden.bs.modal', () => {
    $('#model_name').val("")
    $('#modelsModalTitle').text("Crear Modelo")
    $('#modelsForm_create_btn').text("Crear")
})





//Delete Button
$('#models_dataTable tbody').on( 'click', 'a.delete', function () {


    var arr = table.row($(this).parents("tr")).data();

    if($(window).width() < 768){
       arr = table.row($(this)).data()

    }

    $('#removingConfirmationModal_title_1').text("El Modelo ")
    $('#removingConfirmationModal_title_2').text(arr.model)
    $('#removingConfirmationModal_title_3').text(" será eleminado. ¿Desea Continuar?")

    $('#removingConfirmationModal').modal()

    $('#removingConfirmationModal_yes_btn').on('click', () => {

      $.ajax({
        type:'POST',
        url: '/models/delete',
        data: {
          id: arr.id
        },
        success: function(msg){
          table.ajax.reload(null, false);
        }
      })

    })


})


})

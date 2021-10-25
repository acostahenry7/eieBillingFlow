
//----------------------------Table Definition----------------------------------

  var table = $('#products_dataTable').DataTable({
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
         url:'/products/datafill',
         type: 'GET',
         dataSrc: ""
       },
         columns: [
           { data : "product_id"},
           { data : "product_name"},
           /*{ data : "created_by"},*/
           { data : "product_description"},
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
           "infoEmpty": "Mostrando 0 hasta 0 de 0 Registros",
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


//------------------------------ Actions ---------------------------------------


//Create Button
//Create Button
$('#productsForm_create_btn').on('click' , () => {

  var data = {
      name: $('#providers_name').val(),
      rnc: $('#providers_rnc').val(),
      website: $('#providers_website').val(),
      country: $('#providers_country option:selected').val(),
      province: $('#providers_province option:selected').val(),
      municipality: $('#providers_municipality option:selected').val(),
      sector: $('#providers_sector').val(),
      street1: $('#providers_street1').val(),
      street2: $('#providers_street2').val(),
      phone: $('#providers_phone').val(),
      email: $('#providers_email').val(),
      creationDate: todayDate(),
      modificationDate: todayDate(),
      outletId: 'be1dfdc9-1c20-483f-ae66-d0f7699813d0'
  }

  if ( $('#providersForm_create_btn').text().trim() == "Crear"  ){

  $.ajax({
    url: '/providers/create',
    type: 'POST',
    data: data,
    success: function(provider) {
      $('#createdWarningModal_title_1').text("La Empresa ")
      $('#createdWarningModal_title_2').text($('#outlet_name').val())
      $('#createdWarningModal_title_3').text(" fué creada con exito!")
      $('#createdWarningModal').modal()
      $('#providersModalForm').modal('hide')
      table.ajax.reload(null, false)
    }
  })

  }else {

    data.providerId = params.provider_id
    console.log(data.providerId);

    $.ajax({
      url: '/providers/update',
      type: 'POST',
      data: data,
      success: function(provider) {
        $('#createdWarningModal_title_1').text("El Proveedor ")
        $('#createdWarningModal_title_2').text(` ${params.provider_name}`)
        $('#createdWarningModal_title_3').text(` fué actualizado a ${data.name} con exito!`)
        $('#createdWarningModal').modal()
        $('#providersModalForm').modal('hide')
        table.ajax.reload(null, false)
      }
    })

  }




})



//----------------------------Select Loaders------------------------------------



//Brands
$.ajax({
    type: 'GET',
    url: '/models/brandlist',
    success: function(data){
      for (b of data) {
        //console.log(b);
        $('#products_brand_select').append(new Option(b.brand_name, b.brand_id))
      }
    }
  })


//Models
$.ajax({
  type: 'GET',
  url: '/models/datafill',
  success: function(data){
    data = JSON.parse(data)
    for(b of data){

       $('#products_model_select').append(new Option(b.model, b.model_id))
    }
  }
})


//Product Types
$.ajax({
  type: 'GET',
  url: '/producttypes/datafill',
  success: function(data){

    for(b of data){

       $('#products_productType_select').append(new Option(b.product_type, b.product_type_id))
    }
  }
})


//Providers
$.ajax({
   type: 'GET',
   url: '/providers/datafill',
   success: function(data){
      for (b of data){
         $('#products_providers_select').append(new Option(b.provider_name, b.provider_id))
      }
   }
})


//Images loader
$('#product_images_btn').on('click', function(e){
    e.preventDefault()

    var files = [
      $('#product_image_1').get(0).files[0],
      $('#product_image_2').get(0).files[0],
      $('#product_image_3').get(0).files[0],
      $('#product_image_4').get(0).files[0]
    ]

    var formData = new FormData()

  console.log($('#product_image_1').get(0).files[0]);

   for (i of files){
       formData.append("files", i)
    }
    formData.append("name" , "test form name")

   $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      url: '/temp',
      data: formData,
      processData: false,
      contentType: false,
      success: function() {

      }
    })
})


//--------------------------------Events----------------------------------------


//Brands Form Trigger
$('#products_brandsModalForm_toggle').on('click', () => {

    $('#brandsModalForm').css('z-index', 9999)
    $('#brandsModalForm').modal()

})

//Models Form Trigger
$('#products_modelsModalForm_toggle').on('click', () => {
  $('#modelsModalForm').css('z-index', 9998)
  $('#modelsModalForm').modal()
})


//Product Types Trigger
$('#products_producType_toggle').on('click' , () => {
    $('#productTypesModalForm').css('z-index', 9999)
    $('#productTypesModalForm').modal()
})


//Providers
$('#products_providersModalForm_toggle').on('click' , () => {
    $('#providersModalForm').css('z-index', 9999)
    $('#providersModalForm').modal()
})


$(document).ready(() => {
  if(window.location.pathname  == "/products"){
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
           { data : null,
             "render" : function(){
                return `<input class="check" style="margin: 5px 0 0 8px" type="checkbox" name="" value="">`
             }
           },
           { data : "product_id"},
           { data : "product_name"},
           { data : "product_type"},
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
               <a style="cursor: pointer; text-decoration: none" class="delete ml-3 text-danger fas fa-trash" ></a>\
               <a style="cursor: pointer; text-decoration: none; color: #E1C92D" class="delete ml-3 fas fa-clipboard-list" title="Detalles"></a>`
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
             "targets" : [1],
             "visible" : false
           }
         ]
})





  var classedRows = 0

$('#products_dataTable tbody').on('click' , 'input.check', function(){
        var counter = 0
        //console.log(table.columns(0).data());
      $(this).parents('tr').toggleClass('dt_col_check');

      for ( b of $('#products_dataTable tbody tr.dt_col_check')) {
         if ($(b).attr('class').split(" ")[1] == "dt_col_check"){
              counter++
         }else {
             classedRows++
         }
      }

     if (counter > 0){
        $('#products_dt_select').text("( " + counter + ' ) items seleccionados ')
        $('#products_dt_select_del').prop('hidden', false)
     }else {
        $('#products_dataTable thead th input').prop('checked', false)
        $('#products_dt_select_del').css('transition', '.5s')
        $('#products_dt_select_del').prop('hidden', true)
        $('#products_dt_select').text('')
     }
})


$('#products_dataTable thead').on('click', 'input.check_all ', function() {
  var counter = 0
  var checkedRows = 0
  //var rowQt

    for ( b of $('#products_dataTable tbody tr input')) {
      counter++
      if ($(b).parents('tr').attr('class').split(" ")[1] == "dt_col_check"){
           checkedRows++
      }
    }


        if ( checkedRows != counter){
            for ( b of $('#products_dataTable tbody tr input')) {
              $(b).parents('tr').addClass('dt_col_check')
              $(b).prop('checked', true)
              $('#products_dt_select_del').prop('hidden', false)
              checkedRows = counter
            }
        }else {
            for ( b of $('#products_dataTable tbody tr input')) {
              $(b).parents('tr').removeClass('dt_col_check')
              $(b).prop('checked', false)
              $('#products_dataTable thead th input').prop('checked', false)
              $('#products_dt_select_del').prop('hidden', true)
              checkedRows = 0
            }
        }

  if (checkedRows > 0){
     $('#products_dt_select').text("( " + checkedRows + ' ) items seleccionados ')
  }else {

     $('#products_dt_select').text('')
  }

})

$('#products_dt_select_del').on('click' , function() {
    var data = {}
    data.ids = []

    for (b of $('#products_dataTable tbody tr input')) {
      //console.log(table.row($(b).parents('tr')).data());
      if($(b).parents('tr').attr('class').split(" ")[1] == "dt_col_check"){

        data.ids.push(table.row($(b).parents('tr')).data().product_id);

      }
    }

    $.ajax({
       type: 'POST',
       url: '/products/delete',
       data: data,
       success: function(products){
          for (b of products){
            console.log(b);
          }
          table.ajax.reload(null, false)
          $('#products_dt_select').text('')
          $('#products_dt_select_del').prop('hidden', true)
       }
    })
})


//------------------------------ Actions ---------------------------------------


//Create Button
$('#productsForm_create_btn').on('click' , () => {

  var data = {
      chasis: $('#ct1_chasis').val(),
      brandId: $('#ct1_brand_select option:selected').val(),
      modelId: $('#ct1_model_select option:selected').val(),
      productTypeId: $('#ct1_productType_select option:selected').val(),
      plate: $('#ct1_plate').val(),
      year: $('#ct1_year option:selected').val(),
      registration_number: $('#ct1_registration_number').val(),
      condition: $('#ct1_condition option:selected').val(),
      providerId: $('#ct1_providers_select option:selected').val(),
      color: $('#ct1_color').val(),
      vehicleStatus: $('#ct1_vehicle_status option:selected').val(),
      fuel: $('#ct1_fuel_select option:selected').val(),
      edition: $('#ct1_edition').val(),
      engine: $('#ct1_engine').val(),
      transmition: $('#ct1_transmition option:selected').val(),
      traction: $('#ct1_traction option:selected').val(),
      doors: $('#ct1_doors option:selected').val(),
      innerColor: $('#ct1_inner_color').val(),
      odometer: $('#ct1_odometer option:selected').val(),
      cilinders: $('#ct1_cilinders option:selected').val(),
      mileage: $('#ct1_milage').val(),
      passengers: $('#ct1_passengers option:selected').val(),
      creationDate: todayDate(),
      modificationDate: todayDate(),
      outletId: 'be1dfdc9-1c20-483f-ae66-d0f7699813d0'
  }

  console.log(data);

 $.ajax({
    url: '/products/create',
    type: 'POST',
    data: data,
    success: function() {
      $('#ct1_productsModalForm').modal('hide')
      table.ajax.reload(null, false)
    }
  })
  /*if ( $('#providersForm_create_btn').text().trim() == "Crear"  ){

  $.ajax({
    url: '/ /create',
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

  }*/




})

$('#products_dataTable tbody').on('click', 'a.edit', function(){
    $('#productsModalTitle').text('Actualizar Vehículo')
    var data = table.row($(this).parents('tr')).data()
    console.log(data);
    $('#ct1_productsModalForm').modal()
})

//----------------------------Select Loaders------------------------------------



//Brands
$.ajax({
    type: 'GET',
    url: '/models/brandlist',
    success: function(data){
      for (b of data) {
        //console.log(b);
        $('#ct1_brand_select').append(new Option(b.brand_name, b.brand_id))
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

       $('#ct1_model_select').append(new Option(b.model, b.model_id))
    }
  }
})


//Product Types
$.ajax({
  type: 'GET',
  url: '/producttypes/datafill',
  success: function(data){

    for(b of data){

       $('#ct1_productType_select').append(new Option(b.product_type, b.product_type_id))
    }
  }
})


//Providers
$.ajax({
   type: 'GET',
   url: '/providers/datafill',
   success: function(data){
      for (b of data){
         $('#ct1_providers_select').append(new Option(b.provider_name, b.provider_id))
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

$('#ct1_choice_opt1, #choiceModal_title' ).on('click', () => {
    $('#ct1_choice_modal').modal('hide')
    $('#ct1_productsModalForm').modal()


})

//Form Loader
$('#ct1_modal_btn').on('click' , () => {
    console.log(sessionStorage.getItem('companyTypeId'));
    validateCompanyType(sessionStorage.getItem('companyTypeId'))

})

  }
})

//------------------------------- Global functions -----------------------------

function validateCompanyType (cti){
    switch (cti) {
      case "COMPTP-0001":
          $('#ct1_choice_modal').modal()
        break;
      default:

    }
}

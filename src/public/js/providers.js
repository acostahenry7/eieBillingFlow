$(document).ready( () => {

var params = {};


  var arr = {}

  var table = $('#providers_dataTable').DataTable({
    //serverSide: true,
    responsive: true,
    colReorder: true,
    //stateSave: true,
    dom: 'Blrtip',
     ajax: {
       url:'/providers/datafill',
       type: 'GET',
       dataSrc: ""
     },
       columns: [
         { data : "provider_id"},
         { data : "provider_name"},
         { data : "rnc"},
         { data : "email"},
         { data : "phone_number"},
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
           "targets" : [],
           "visible" : false
         }
       ]
  })




//-------------------------------- Actions -------------------------------------


//Create Button
$('#providersForm_create_btn').on('click' , () => {

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


//Delete Button
$('#providers_dataTable tbody').on('click', 'a.delete', function(){


  var arr = table.row($(this).parents("tr")).data();

  if($(window).width() < 768){
     arr = table.row($(this)).data()
    //console.log(arr);
  }

  $('#removingConfirmationModal_title_1').text("El Proveedor ")
  $('#removingConfirmationModal_title_2').text(arr.provider_name)
  $('#removingConfirmationModal_title_3').text(" será eleminado. ¿Desea Continuar?")

  $('#removingConfirmationModal').modal()

  $('#removingConfirmationModal_yes_btn').on('click', () => {
    $.ajax({
      type:'POST',
      url: '/providers/delete',
      data: {
        providerId: arr.provider_id
      },
      success: function(msg){
        table.ajax.reload(null, false);
      }
    })

  })
})


//Update Button
$('#providers_dataTable tbody').on('click' , 'a.edit', function(){
  var arr = table.row($(this).parents("tr")).data();

  if($(window).width() < 768){
     arr = table.row($(this)).data()
    //console.log(arr);
  }

  $('#providers_name').val(arr.provider_name)
  $('#providers_rnc').val(arr.rnc)
  $('#providers_website').val(arr.website)
  $('#providers_country').val(arr.country).change()
  $('#providers_province').val(arr.province_id)
  $('#providers_municipality').val(arr.municipality_id)
  $('#providers_sector').val(arr.sector_id)
  $('#providers_street1').val(arr.street_1)
  $('#providers_street2').val(arr.street_2)
  $('#providers_phone').val(arr.phone_number)
  $('#providers_email').val(arr.email)
  $('#providersForm_create_btn').text("Actualizar")
  $('#providersModalTitle').text('Actualizar Proveedor')
  $('#providersModalForm').modal()

  params = arr

})




//--------------------------------- Events -------------------------------------



//Countries loader
  $.ajax({
     type: 'GET',
     url: '/countries/list',
     success: function(countries){
        for (b of countries){
            $('#providers_country').append(new Option(b.country_name, b.country_id))
        }
     }
  })

  //Provinces loader
  $('#providers_country').on('change', () => {

        console.log("pcoun");
       var data = {
         countryId: $('#providers_country option:selected').val()
       }
       console.log(data.countryId);

      $.ajax({
        url: '/provinces/list',
        type: 'POST',
        data: data,
        success: function (provinces){

              $('#providers_province').empty().append(`<option value="" disabled selected>Selecciona un provincia</option>`,"")

              for (i of provinces){
                 $('#providers_province').append(new Option(i.province_name, i.province_id))
              }


        },
        error: function (msg){
           console.log(msg);
        }
      })
  })

  $('#providers_modal_btn').on('click' , () => {

    $('#providers_name').val("")
    $('#providers_rnc').val("")
    $('#providers_website').val("")
    $('#providers_country').val("")
    $('#providers_province').val("")
    $('#providers_municipality').val("")
    $('#providers_sector').val("")
    $('#providers_street1').val("")
    $('#providers_street2').val("")
    $('#providers_phone').val("")
    $('#providers_email').val("")
    $('#providersForm_create_btn').text("Crear")
    $('#providersModalTitle').text('Crear Proveedor')
    $('#providersModalForm').modal()
  })

})




function todayDate(){
  var date = new Date();
  var currentYear = date.getFullYear();
  var today = date.getDate();
  var currentMonth = date.getMonth() + 1;
  switch (currentMonth) {
    case 1:
        currentMonth =  "Jan";
      break;
    case 2:
        currentMonth= "Feb";
        break;
    case 3:
        currentMonth =  "Mar";
        break;
    case 4:
        currentMonth =  "Apr";
        break;
    case 5:
        currentMonth =  "May";
        break;
    case 6:
        currentMonth =  "Jun";
      break;
    case 7:
        currentMonth =  "Jul";
        break;
    case 8:
        currentMonth =  "Aug";
        break;
    case 9:
        currentMonth =  "Sep";
        break;
    case 10:
        currentMonth =  "Oct";
        break;
    case 11:
        currentMonth =  "Nov";
        break;
    case 12:
        currentMonth =  "Dec";
        break;
    default:

  }
  if (today < 21){
    today = "0" + today;
  }

  date =  today + "-"+ currentMonth + "-"+ currentYear
  return date
}

///console.log($('#bf-datatable thead'));

$(document).ready(()=> {

  $('#outlet_form', '#outlet_form_content').on('submit', (e) => {
      e.preventDefault()
  })



  if(window.location.pathname  == "/outlets"){

  var arr = [];

  var table = $('#outlets_dataTable').DataTable({
     responsive: true,
     colReorder: true,
     //stateSave: true,
     dom: 'Blrtip',
      ajax: {
        url:'/outlets/datafill',
        type: 'GET',
        dataSrc: ""
      },
        columns: [
          { data : "outlet_id"},
          { data : "outlet_name"},
          { data : "company_id"},
          { data : "rnc"},
          { data : "creation_date"},
          { data : "modification_date"},
          { data : null,
            "render": function(data){
              switch (data.status_id) {
               case 'STATUS-0001':
                   arr.statusBgColor="#66b050";
                   arr.status = "Activo";
                  break;
               case 2:
                   arr.statusBgColor="#FF6B6B";
                   arr.status = "Inactivo";
                 break;
                default:

              }
               icon = `<span class="text-white shadow-sm" name="${arr.status}" style="border-radius:14px; padding: 0 5px 0 4px; font-size: 14px; background-color:${arr.statusBgColor}; font-weight: bold;">`+arr.status+'</span>'
               return icon
            }
          },
          {data: null,
            "render": function(data){
              switch (data.status_id) {
               case 'STATUS-0001':
                   arr.eyeClass = "fas fa-eye";
                   arr.eyeTitle = "Inactivar";
                  break;
               case 'STATUS-0002':
                   arr.eyeClass = "fas fa-eye-slash";
                   arr.eyeTitle = "Activar";
                 break;
                default: //
              }

              return `<a style="cursor: pointer;  text-decoration: none" class="edit text-primary fas fa-edit"></a>\
              <a style="cursor: pointer; text-decoration: none" class="delete ml-3 text-danger fas fa-trash"></a>\
              <a style="cursor: pointer; text-decoration: none" title=${arr.eyeTitle} class="disable ml-3 text-secondary ${arr.eyeClass}"></a>`
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
        "columnDefs": [
          {
            "targets": [],
            "visible": false
          }]
   })


   //Retrieves companies
   $.ajax({
     type: 'GET',
     url: '/outlets/companieslist',
     success: function(data){
       for (b of data) {
         $('#outlet_companyname').append(new Option(b.company_name, b.company_id))
       }
       companiesQt()
     }
   })



   $('#outlets_company_creation').on('click', (e) => {

    e.preventDefault()
     $('#companiesModalForm').css('position', 'absolute')
     $('#companiesModalForm').css('z-index', 9999)
     $('#companiesModalForm').modal()
   })




//
$('#outlet_create_btn').on('click', () => {
  var companiesQuantity = companiesQt()
  console.log(companiesQuantity);
  if (companiesQuantity > 0){
    $('#outletsModalForm').modal()
  }else{
    $('#unparentingModal').modal()
  }
})
//---------------------------Creation Form--------------------------------------
   $('#outletsForm_create_btn').on('click', () => {

     var data = {
         //image: $('#outlet_image')[0].files[0]
        outletName: $('#outlet_name').val(),
         outletRnc: $('#outlet_rnc').val(),
         companyId: $('#outlet_companyname option:selected').val(),
         website: $('#outlet_website').val(),
         country: $('#outlet_country option:selected').val(),
         province: $('#outlet_province').val(),
         municipality: $('#outlet_municipality').val(),
         sector: $('#outlet_sector').val(),
         street1: $('#outlet_street1').val(),
         street2: $('#outlet_street2').val(),
         phones: $('#outlet_phones').val(),
         fax: $('#outlet_fax').val(),
         email: $('#outlet_email').val(),
         creationDate: todayDate(),
         modificationDate: todayDate()

     }


  if($('#outletsForm_create_btn').text().trim() == "Crear"){
      console.log("here");

      $.ajax({
        type: 'POST',
        url: '/outlets/create',
        //enctype: "multipart/form-data",
        data: data,
        success: function(outlet){
          $('#createdWarningModal_title_1').text("La Empresa ")
          $('#createdWarningModal_title_2').text($('#outlet_name').val())
          $('#createdWarningModal_title_3').text(" fué creada con exito!")
          table.ajax.reload(null, false);
          $('#createdWarningModal').modal()
          $('#outletsModalForm').modal("hide");
        }
      })

    }else{

        data.outletId = params.outlet_id
        console.log(data);
      $.ajax({
        type: 'POST',
        url: '/outlets/update',
        //enctype: "multipart/form-data",
        data: data,
        success: function(outlet){
          $('#createdWarningModal_title_1').text(`La Empresa `)
          $('#createdWarningModal_title_2').text($('#outlet_name').val())
          $('#createdWarningModal_title_3').text(" ha sido actualizada con exito!")
          table.ajax.reload(null, false);
          $('#createdWarningModal').modal()
          $('#outletsModalForm').modal("hide");
        }
      })
    }
  })


//---------------------------update Button--------------------------------------
 $('#outlets_dataTable tbody').on('click', 'a.edit', function(){

         if($(window).width() < 768){
            var arr = table.row($(this)).data()
           console.log(arr);
         } else {
           var arr = table.row($(this).parents("tr")).data();
           console.log(arr);
         }


         //console.log($('#brandsModalTitle').text());
         $('#outletsModalTitle').text("Actualizar Empresa")
        //$('#outletsForm_create_btn').prop('disabled', true)
         $('#outletsForm_create_btn').text("Actualizar")

         $('#outlet_name').val(arr.outlet_name)
         $('#outlet_rnc').val(arr.rnc)
         $('#outlet_companyname').val(arr.company_id)
         $('#outlet_website').val(arr.website)
         $('#outlet_country').val(arr.country).change()
         $('#outlet_province').val(arr.province_id).change()
         $('#outlet_municipality').val(arr.municipality_id)
         $('#outlet_sector').val(arr.sector_id)
         $('#outlet_street1').val(arr.street_1)
         $('#outlet_street2').val(arr.street_2)
         $('#outlet_phones').val(arr.phones)
         $('#outlet_fax').val(arr.fax)
         $('#outlet_email').val(arr.email)



         $('#outletsModalForm').modal()
         console.log(arr.company_id);

         params = arr;
 })


//---------------------------Delete Button--------------------------------------
  $('#outlets_dataTable tbody').on('click' , 'a.delete', function() {
          console.log(table.row($(this).parents("tr")));

          var arr = table.row($(this).parents("tr")).data();

          if($(window).width() < 768){
             arr = table.row($(this)).data()
            //console.log(arr);
          }

          $('#removingConfirmationModal_title_1').text("La Empresa ")
          $('#removingConfirmationModal_title_2').text(arr.outlet_name)
          $('#removingConfirmationModal_title_3').text(" será eleminada. ¿Desea Continuar?")

          $('#removingConfirmationModal').modal()

          $('#removingConfirmationModal_yes_btn').on('click', () => {
            $.ajax({
              type:'POST',
              url: '/outlets/delete',
              data: {
                outletId: arr.outlet_id
              },
              success: function(msg){
                table.ajax.reload(null, false);
              }
            })

          })
  })




   //Retrieves Companies
   $('#outlet_country').on('change', () => {


        var data = {
          countryId: $('#outlet_country option:selected').val()
        }

       $.ajax({
         url: '/provinces/list',
         type: 'POST',
         data: data,
         success: function (provinces){
             if (provinces.length > 0){
               $('#outlet_province').empty()
               for (i of provinces){

                  $('#outlet_province').append(new Option(i.province_name, i.province_id))
               }
             }

         },
         error: function (msg){
            console.log(msg);
         }
       })
   })

   //Retrieves Municipalities
   $('#outlet_province').on('change', () => {


        var data = {
          provinceId: $('#outlet_province option:selected').val()
        }

       $.ajax({
         url: '/municipalities/list',
         type: 'POST',
         data: data,
         success: function (municipalities){
             if (municipalities.length > 0){
               $('#outlet_municipality').empty()
               for (i of municipalities){
                  $('#outlet_municipality').append(new Option(i.municipality_name, i.municipality_id))
               }
             }

         },
         error: function (msg){
            console.log(msg);
         }
       })
   })


//----------------------------------Events--------------------------------------



//---Validation Triggers--------------------------------------------------------

///Inputs
$(
  '#outlet_name,\
   #outlet_rnc'
).on('input', e => {
    console.log($(this).val());
    validateChanges()
})

///Selects


   /*$.get('/outlets/datafill')
     .done(data => {
         console.log("hola");
     })



 $('#outlet_form_refresh_btn').on('click', () => {
     table.ajax.reload();
 })*/



   }
})

//Today Date function

function companiesQt(){
  var res = $('#outlet_companyname').children('option').length

  return res
}



function validateChanges(updated) {
  updated = false
  console.log($('#outlet_form_content'));
 for ( b of $('#outlet_form_content')[0]){
      switch ($(b).attr('id')) {
        case "outlet_name":

          console.log(params.outlet_name + " vs " + $(b).val());
          if (params.outlet_name != $(b).val()){
            updated = true
          }
          break;
        case "outlet_rnc":
          if (params.rnc != $(b).val()){
            updated = true
          }
        break;
        default:

      }
    //  console.log($(b).attr('id'));
  }

  console.log("Form Updated",  updated);
}

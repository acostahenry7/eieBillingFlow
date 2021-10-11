$(document).ready( () => {


      $.ajax({
         url: '/providers/datafill',
         type: 'GET',
         success: function (data) {
            console.log(data);
         }
      })
  console.log("hi");
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
//coment





//--------------------------------- Events -------------------------------------
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
            console.log(provinces);
            if (provinces.length > 0){
              $('#providers_province').empty()
              for (i of provinces){
                console.log(i.province_name);
                 $('#providers_province').append(new Option(i.province_name, i.province_id))
              }
            }

        },
        error: function (msg){
           console.log(msg);
        }
      })
  })

})

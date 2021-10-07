$(document).ready( () => {
    var params = {}
    console.log("Variants Ready");

    var table = $('#variants_dataTable').DataTable({
       responsive: true,
       colReorder: true,
       //stateSave: true,
       dom: 'Blrtip',
        ajax: {
          url:'/variants/datafill',
          type: 'GET',
          dataSrc: ""
        },
          columns: [
            { data : "variant_id"},
            { data : "variant_name"},
            { data : "creation_date"},
            { data : "modification_date"},
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
                <a style="cursor: pointer; text-decoration: none" class="delete ml-3 text-danger fas fa-trash"></a>`
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

     $('#variantsForm_create_btn').on('click', () => {
       var data;




       console.log($('#variants_dataTable tbody th'));

       if($('#variantsForm_create_btn').text().trim() == "Crear"){

             data = {
               variant: $('#variant_name').val(),
               creationDate: todayDate(),
               modificationDate: todayDate()
             }

             console.log($('#variant_name').val());
             $.ajax({
               type: 'post',
               url: '/variants/create',
               data: data,
               success: function(data){
                 table.ajax.reload(null, false)
                 $('#variantsModalForm').modal("hide");


               },

               complete: function(){
                 $.ajax({
                   type: 'GET',
                   url: '/models/variantlist',
                   success: function(data){
                     $('#model_variant_select').empty();
                     for (b of data) {
                       console.log(b.variant_name);
                       $('#model_variant_select').append(new Option(b.variant_name, b.variant_id))
                     }
                   }
                 })

               }
             })
           }else {
             console.log(params.id);


             data = {
               id: params.id,
               variant: $('#variant_name').val(),
               modificationDate: todayDate()

             }

             $.ajax({
               type: 'POST',
               url: '/variants/update',
               data: data,
               success: function(msg){
                 console.log(msg);
                 table.ajax.reload(null, false)
                 $('#createdWarningModal_title_1').text(`La Marca ${params.variant} ha sido actualizada a `)
                 $('#createdWarningModal_title_2').text($('#variant_name').val())
                 $('#createdWarningModal_title_3').text(" con exito!")
                 $('#createdWarningModal').modal()
                 $('#variantsModalForm').modal("hide")
               }
             })

           }
       })



   //-----------------------------Update Button------------------------------------
     $('#variants_dataTable tbody').on('click', 'a.edit', function() {


         var arr = table.row($(this).parents("tr")).data();

         if($(window).width() < 768){
            arr = table.row($(this)).data()

         }

        console.log(arr);

         console.log($('#variantsModalTitle').text());
         $('#variantsModalTitle').text("Actualizar Variante")
         $('#variantsForm_create_btn').text("Actualizar")
         $('#variantsModalForm').modal()
         $('#variant_name').val(arr.variant_name)

         params = arr;
     })


   //-----------------------------Delete Button------------------------------------
     $('#variants_dataTable tbody').on( 'click', 'a.delete', function () {
         console.log("hola");

         var arr = table.row($(this).parents("tr")).data();

         if($(window).width() < 768){
            arr = table.row($(this)).data()
           //console.log(arr);
         }

         $('#removingConfirmationModal_title_1').text("La variante ")
         $('#removingConfirmationModal_title_2').text(arr.variant_name)
         $('#removingConfirmationModal_title_3').text(" será eleminada. ¿Desea Continuar?")

         $('#removingConfirmationModal').modal()

         $('#removingConfirmationModal_yes_btn').on('click', () => {
           $.ajax({
             type:'POST',
             url: '/variants/delete',
             data: {
               id: arr.variant_id
             },
             success: function(msg){
               table.ajax.reload(null, false);
             }
           })

         })


     })


   //-----------------------------Refresh Button-----------------------------------
   $('#variant_form_refresh_btn').on('click', () => {
        table.ajax.reload(null, false );
   })




   //----------------------------Search Options------------------------------------
   //Search by name
    $('#variant_form_name_input').on( 'keyup', function () {
        table.search(this.value).draw();
        table.state.save();

    });


   //-----------------------Actions on Modal Events--------------------------------


   //----------------------------On Form Close-------------------------------------
   $('#variantsModalForm').on('hidden.bs.modal', () => {
       $('#variant_name').val("")
       $('#variantsModalTitle').text("Crear Variante")
       $('#variantsForm_create_btn').text("Crear")
   })


})

$(document).ready(() => {

  ///if(window.location.pathname  == "/companies"){


  $('#company_form').on('submit', (e) => {
      e.preventDefault()
  })
  var arr = [];
  var params = {};
let i=0
//
//---------------------------Datatable Definition-------------------------------


  var table = $('#companies_dataTable').DataTable({
     //serverSide: true,
     responsive: true,
     colReorder: true,
     async: false,
     stateSave: true,
     dom: 'Blrtip',
      ajax: {
        url:'/companies/datafill',
        type: 'GET',
        dataSrc: ""
      },
        columns: [
          { data : "id"},
          { data : "company_id"},
          { data : "company_name"},
          { data : "rnc"},
          { data : null,
            "render": function(data){
             switch (data.status_id) {
              case 'STATUS-0001':
                  arr.statusBgColor="#66b050";
                  arr.status = "Activo";
                 break;
              case 'STATUS-0002':
                  arr.statusBgColor="#FF6B6B";
                  arr.status = "Inactivo";
                break;
               default:

             }
              return `<span class="text-white shadow-sm" name="${arr.status}" style="border-radius:14px; padding: 0 5px 0 4px; font-size: 14px; background-color:${arr.statusBgColor}; font-weight: bold;">`+arr.status+'</span>'

            }
          },
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
            "targets": [0,3],
            "visible": false
          }
        ]

   })



//----------------------------Searching options---------------------------------


  //Search by name
   $('#company_form_name_input').on( 'keyup', function (e) {
       //table.rows().search('\\b' + $('#company_form_status_select').val() + '\\b', true, false).draw();
       //console.log(this.value);
       //console.log("hola");
       table.search(this.value).draw();
       table.state.save();

        //table.column(0).search(this.value)//.column(4).search('\\b' + $('#company_form_status_select').val() + '\\b', true, false).draw();

   });

  //Search by Status
  $('#company_form_buscar_btn').on('click', () => {
     //console.log($('#company_form_status_select').val());
     table.rows().search('\\b' + $('#company_form_status_select').val() + '\\b', true, false).draw()
   })

   //Refresh datatable button
   $('#company_form_refresh_btn').on('click', ()=> {
       table.ajax.reload(null, false);
   })

   //Refresh datatable
   setInterval( function () {
    table.ajax.reload(null, false );
  }, 20000 );




//  $('#bf_spinner').css('display', 'none')



//----------------------------Button's Actions----------------------------------


  //Form create Button
  $('#companiesForm_create_btn').on('click', ()=> {
    //console.log($('#companiesForm_create_btn').text());
    //console.log("Validando: " + validateCreationForm());
    var fieldStatus = validateCreationForm()
    console.log("here");

      if (fieldStatus == false){

      }
      else {
          $('#emptyFieldsWarning_list_container').css('display','none')

          console.log($('#companiesForm_create_btn').text().trim());

          if ($('#companiesForm_create_btn').text().trim() == "Crear"){
            console.log("on creation");
            //console.log($('#companiesForm_create_btn').attr("name"));
          var data = {
            name: $('#company_name').val(),
            status: 'STATUS-0001',
            rnc: $('#company_rnc').val(),
            creationDate: todayDate(),
            modificationDate: todayDate()
          };
          //console.log(data);

           //Ajax Call to insert data
           $.ajax({
             url: '/companies/create',
             type: 'POST',
             data: data,
             success: function(r){
               $('#createdWarningModal_title_1').text("El Grupo Empresarial ")
               $('#createdWarningModal_title_2').text($('#company_name').val())
               $('#createdWarningModal_title_3').text(" fué creado con exito!")
               table.ajax.reload(null, false);
               $('#createdWarningModal').modal()
               $('#companiesModalForm').modal("hide");

             },
             complete: function(){
                console.log("hola");
               $.ajax({
                 type: 'GET',
                 url: '/outlets/companieslist',
                 success: function(data){
                   $('#outlet_companyname').empty()
                   for (b of data) {
                     $('#outlet_companyname').append(new Option(b.company_name, b.company_id))
                   }
                 }
               })
             },
             error: function(res, err, error) {
               if(res.status == 505){
                   alert("No se pudo conectar a la Base de Datos");
               }
               ////console.log(err, data);

         }
       })

         } else {

           console.log(params.id);
           var data = {
             companyId: params.id,
             oldName: $('#exampleModalLongTitle').attr("name"),
             name: $('#company_name').val(),
             rnc: $('#company_rnc').val(),
             modificationDate: todayDate()
           };

           $.ajax({
             url: '/companies/update',
             type: 'POST',
             data: data,
             success: function(r){
               $('#createdWarningModal_title_1').text("El Grupo Empresarial ha sido actualizado a ")
               $('#createdWarningModal_title_2').text($('#company_name').val())
               $('#createdWarningModal_title_3').text(" con exito!")
               $('#createdWarningModal').modal()
               table.ajax.reload(null, false);
               $('#companiesModalForm').modal("hide");
             },
             error: function(res, err, error) {
               if(res.status == 505){
                   alert("No se pudo conectar a la Base de Datos");
               }
               //console.log(err, data);
         }
         })
    }
  }


  })

  //Edit Button
  $('#companies_dataTable tbody').on('click', 'a.edit' , function(){
    //console.log($(window).width());
    let arr;

     arr = table.row($(this).parents("tr")).data()

    if($(window).width() < 1024){
       arr = table.row($(this)).data()
      //console.log(arr);
    }


    ////console.log(arr);
    $('#companiesForm_create_btn').text("Actualizar")
    $('#company_name').val(arr.company_name)
    $('#company_rnc').val(arr.rnc)
    $('#exampleModalLongTitle').attr("name", arr.company_name);
    //console.log($('#exampleModalLongTitle').attr("name"));
    $('#companiesModalForm').modal()

    params = arr;
  })

  //Delete Button
  $('#companies_dataTable tbody').on( 'click', 'a.delete', function() {



        //console.log(table.row($(this).parents("tr")).data());
      var childs;
      var arr = table.row($(this).parents("tr")).data();

      if ($( window ).width() < 1024){
          var arr = table.row($(this)).data();
      }

      console.log(arr);

      $.ajax({
        url: '/outlets/list',
        type: 'POST',
        data: arr,
        success: function(outlets){
          console.log(outlets);
           if(outlets.length == 0 ){
             $('#removingConfirmationModal_title_1').text("El Grupo Empresarial ")
             $('#removingConfirmationModal_title_2').text(arr.company_name)
             $('#removingConfirmationModal_title_3').text(" será eleminado. ¿Desea Continuar?")

             $('#removingConfirmationModal').modal()
           }else {
             console.log("No se puede eleminar");
             console.log(outlets);

             for(b of outlets){
               var li = document.createElement("li")
               li.appendChild(document.createTextNode(b.outlet_name))
               $('#childlist_outlets').append(li)
             }


             $('#childvalidation_object').text("las siguientes sucursales están asociadas.")
             $('#childValidationModal').modal()
           }
        }
      })





    $('#removingConfirmationModal_yes_btn').on('click', () => {
        console.log("Create companie helo");
        let data = {
          id: arr.id
        }
      $.ajax({
        url: '/companies/delete',
        type: 'POST',
        data: data,
        success: function(r){
          $('#createdWarningModal_title_1').text("El Grupo Empresarial ")
          $('#createdWarningModal_title_2').text(arr.company_name)
          $('#createdWarningModal_title_3').text(" fué eliminado exitosamente!")
          $('#createdWarningModal').modal()
          table.ajax.reload(null, false)

        },
        error: function(res, err, error) {
          if(res.status == 505){
              alert("No se pudo conectar a la Base de Datos");
          }
          //console.log(err, data);
    }
    })
    })
  })

  //Disable Button
  $('#companies_dataTable tbody').on( 'click', 'a.disable', function() {

    if($(window).width() < 768){
      var arr = table.row($(this)).data();
    }
    else {
      var arr = table.row($(this).parents("tr")).data();
    }

    //console.log(arr);
    //console.log(arr.company_id);
    var data = {
      companyId: arr.company_id
    }

    $('#disablingConfirmationModal_title_1').text("El Grupo Empresarial ")
    $('#disablingConfirmationModal_title_2').text(arr.company_name)
    $('#disablingConfirmationModal_title_3').text(" será deshabilitado. ¿Desea Continuar?")

    //console.log(arr);
    if (arr.status_id == 'STATUS-0002'){
      //Enables company status
      $.ajax({
        url: '/companies/enable',
        type: 'POST',
        data: data,
        beforeSend: function(){
          console.log("hello");
          $('#main-spinner').attr("hidden", false)
        },
        success: function(r){
          $('#createdWarningModal_title_1').text("El Grupo Empresarial ")
          $('#createdWarningModal_title_2').text(arr.company_name)
          $('#createdWarningModal_title_3').text(" fué habilitado.")
          $('#createdWarningModal').modal()
          table.ajax.reload(null, false);
        },
        complete: function(){
           console.log("Done");
           table.ajax.reload(null, false);
           $('#main-spinner').attr("hidden", true)
        },
        error: function(res, err, error) {
          if(res.status == 505){
              alert("No se pudo conectar a la Base de Datos");
          }
          //console.log(err, data);
    }
    })
  }else {
    //console.log(data);
    //Disables Company status
    $('#disablingConfirmationModal').modal()
    $('#disablingConfirmationModal_yes_btn').off('click').on('click', (e)=> {
          e.preventDefault()
          console.log("Times");
          console.log(data, arr.status_id);
          $.ajax({
            url: '/companies/disable',
            type: 'POST',
            data: data,
            success: function(){
              $('#createdWarningModal_title_1').text("El Grupo Empresarial ")
              $('#createdWarningModal_title_2').text(arr.company_name)
              $('#createdWarningModal_title_3').text(" fué deshabilitado.")
              $('#createdWarningModal').modal()
              table.ajax.reload(null, false);
            },
            error: function(res, err, error) {
              if(res.status == 505){
                  alert("No se pudo conectar a la Base de Datos");
              }
              //console.log(err, data);
        }
        })
    })

  }

  })



//--------------------Actions on Modal Events-----------------------------------


  //When Companies Form closes
  $('#companiesModalForm').on('hidden.bs.modal', function () {
      var list = document.getElementById('emptyFieldsWarning_List');
      $('#company_name').val("");
      $('#company_rnc').val("");
      $('#companiesForm_create_btn').text("Crear");
      $('#emptyFieldsWarning_list_container').css('display','none')

  })


  //When Creation Done Warnig appears
  $('#createdWarningModal').on('shown.bs.modal', ()=> {

  })

  $('#childValidationModal').on('hidden.bs.modal', function(){
     $('#childlist_outlets').empty()
  })




  ///}


  //Get companies with authentication
  $('#to_comapnies').on('click', ()=> {
    console.log(sessionStorage.getItem('token'));
    $.ajax({
      type: 'GET',
      url: '/companies',
      success: function(data){
        window.location.href = '/companies'
      },
      error:  function(msg){
        $('#unauthorizeModal').modal()
      }
    })
  })

})








//Companies Create form Validation
function validateCreationForm(){


      //Manage the Empty Fields Warning blockquote
      var list = document.getElementById('emptyFieldsWarning_List');
      if(list.childNodes.length >= 2){
        for(i=0  ; i < 1 ; i++){
            //console.log(list.childNodes[1].id);
            list.removeChild(list.childNodes[1]);
        }
      }

    var arr = [];
    var companyName = document.forms["company_form_modal"]["company_form_name"].value;

    //console.log(companyName);
    if (companyName == ""){
        arr.push("Grupo Empresarial");
    }

    //console.log(arr);
    for (i of arr){
      node = document.createElement("li");
      textnode = document.createTextNode("- " +i);
      node.appendChild(textnode);
      document.getElementById('emptyFieldsWarning_List').appendChild(node);
      $('#emptyFieldsWarning_list_container').css('display','block')
    }


    //console.log("validate");
    if(arr.length > 0){
      return false
    }else{
      return true
      $('#createdWarningModal_title_1').text("El Grupo Empresarial ha sido creado a ")
      $('#createdWarningModal_title_2').text($('#company_name').val())
      $('#createdWarningModal_title_3').text(" con exito!")
      $('#createdWarningModal').modal()
    }
}


/*






$(document).ready( () => {
//console.log(window.location.pathname);

if(window.location.pathname  == "/companies"){
  //setInterval(companyDeployment, 2000);


//Datatable datafill function definition
function companyDeployment(){

  var arr = {
  //  id:[],
    name:[],
    status:[],
    cDate:[],
    mDate:[],
    rnc:[],
  actions:['<div>\
              <a style="cursor: pointer;  text-decoration: none" class="edit text-primary fas fa-edit"></a>\
              <a style="cursor: pointer; text-decoration: none" class="delete ml-3 text-danger fas fa-trash"></a>\
              <a style="cursor: pointer; text-decoration: none" class="disable ml-3 text-secondary fas fa-eye"></a>\
              </div>'],
    rs:[]
  }

//Captures companies form values
  var params = {
    name: $('#company_form_name_input').val(),
    status: $('#company_form_status_select option:selected').val()
  }


if (params.name == ""){
  params.name ="_";
}

if (params.status == ""){
  params.status ="_";
}

$.ajax({
  url: '/datafill',
  type: 'post',
  data: params,
  success: function(data){

    $('#bf_spinner').css('display', 'none')
    for( i of data.rows){
        ////console.log(i.company_id);
      //  arr.id.push(i.company_id)
        arr.name.push(i.company_name)
        arr.status.push(i.status_name)
        arr.cDate.push(i.creation_date)
        arr.mDate.push(i.modification_date)
        arr.rnc.push(i.rnc)
    }


    var statusBgColor;
    for (i=0; i < arr.name.length; i++){

      switch (arr.status[i]) {
        case "enabled":
            statusBgColor="#66b050";
            arr.status[i] = "Activo";
            var eyeClass = "fas fa-eye";
            var eyeTitle = "Inactivar";
          break;
        case "disabled":
          arr.status[i] = "Inactivo";
            statusBgColor = "#FF6B6B";
            var eyeClass = "fas fa-eye-slash";
            var eyeTitle = "Activar"
          break;
        default:

      }



      arr.rs.push(['<input id="check_dt" class="select-checkbox" type="checkbox">',arr.name[i], `<span class="text-white shadow-sm" name="${arr.status[i]}" style="border-radius:14px; padding: 0 5px 0 4px; font-size: 14px; background-color:${statusBgColor}; font-weight: bold;">`+arr.status[i]+'</span>',
       arr.cDate[i], arr.mDate[i], arr.rnc[i] ,'<a style="cursor: pointer;  text-decoration: none" class="edit text-primary fas fa-edit"></a>' +
       '<a style="cursor: pointer; text-decoration: none" class="delete ml-3 text-danger fas fa-trash"></a>' +
       `<a style="cursor: pointer; text-decoration: none" title=${eyeTitle} class="disable ml-3 text-secondary ${eyeClass}"></a>`])
    }

//console.log(sessionStorage.rowKeyStore);
   var table = $('#bf-datatable').DataTable({

         columnsDefs:[{
           orderable: false,
           "width": "10px",
           targets:   0
         }],
         select: {
             style:    'multi',
             selector: 'td:first-child .select-checkbox'
         },
          "columns": [
            {"title" : ""},
            {"title" : "Name"},
            {"title" : "Estado"},
            {"title" : "Fecha Creacion"},
            {"title" : "Fecha Modificacion"},
            {"title" : "RNC"},
            {"title" : "Acciones"},
          ],
          "order": [[ 3, "desc" ]],
          data: arr.rs,
          dom: 'Blrtip',
          responsive: true,
          colReorder: true,
          stateSave: true,
          rowReorder: {
            selector: 'td:nth-child(2)'
            },
            "bDestroy": true,
            "lengthMenu": [[10, 15, 25], [10, 15, 25]]
        })

        ////console.log(sessionStorage.rowKeyStore);

        var selectComposition = []
        $('#bf-datatable tbody').on('click', 'td:first-child .select-checkbox, tr', function(event){


            selectComposition.push($(this)[0].tagName)
            ////console.log(selectComposition.length);
            //console.log(table.row(this).index());
            if ($(this)[0].tagName == "TR" && selectComposition.length >= 1){

              //console.log(selectComposition.length);
              if (selectComposition.length == 2){

              $(this).toggleClass('selected')
              persistSelection(table.row(this).index(), $(this).hasClass('selected'));

            }
            selectComposition = []

            }else if(selectComposition > 1){
              selectComposition = []

            }
            if($(this)[0].tagName == "INPUT"){
              $(this).toggleClass('selected')
            }

          });
      },
  error: function(res, err, error) {
  /*if(res.status == 505){
        alert("No se pudo conectar a la Base de Datos");
    }
    //console.log(err, data);
}
})
}


//Calls datafill function when document ready

function persistSelection( index, isSelected ){
  ////console.log(isSelected);
  ////console.log(index);
  var ss = sessionStorage;
  if (!(ss.rowKeyStore))
  {
    ss.rowKeyStore = "{}";
  }
  var rowKeys = JSON.parse(ss.rowKeyStore);
  if (isSelected === false && rowKeys.hasOwnProperty(index))
  {
    //console.log('removing row ' + index + ' from selection list');
    delete rowKeys[index];
  }
  else if (isSelected)
  {
    rowKeys[index] = true;
    //console.log("Row " + index + " added to selection list");
  }
  //console.log(rowKeys);
  ss.rowKeyStore = JSON.stringify(rowKeys);
}


function selectPersistedRows(table)
{
  if (!(sessionStorage.rowKeyStore))
    return;

  var rowKeys = JSON.parse(sessionStorage.rowKeyStore);
  for (var key in rowKeys)
  {
    $(table.row(key).node()).addClass('selected');
    ////console.log(table);
    var arr = $(table.row(key).data());
    ////console.log(arr);
    //console.log(arr);
    if (typeof arr != "undefined"){
      //console.log(arr);
      arr[0] = '<input id="check_dt" class="select-checkbox" type="checkbox" checked>';
      //console.log($(table.row(key).data()));
      //$('#bf-datatable').DataTable();
       //$('#bf-datatable').dataTable().fnUpdate(arr,key,["undefined"],false);

    }

  }
}


/*if(window.location.pathname  == "/companies"){
  setInterval(companyDeployment, 2000);
  //console.log("hola");
}


$('#company_form_name_input').on('input', e => {
    companyDeployment()
})

//Edit button
$('#bf-datatable tbody').on( 'click', 'a.edit', function () {

    if($(window).width() < 768){
      var data = $('#bf-datatable').DataTable().row($(this)).data();
    }
    else{
      var data = $('#bf-datatable').DataTable().row($(this).parents("tr")).data();
    }
      $('#companiesModalForm').modal()
      $('#company_name').focus()
      $('#company_name').val(data[1]);
      $('#company_rnc').val(data[5]);
      $('#companiesForm_create_btn').text("Actualizar")


})

//Delete Button
$('#bf-datatable tbody').on( 'click', 'a.delete', function () {


  $('#removingConfirmationModal').modal()
  if($(window).width() < 768){
    var arr = $('#bf-datatable').DataTable().row($(this)).data();
  }
  else{
    var arr = $('#bf-datatable').DataTable().row($(this).parents("tr")).data();
  }
  $('#removingConfirmationModal_title_1').text("El Grupo Empresarial ")
  $('#removingConfirmationModal_title_2').text(arr[1])
  $('#removingConfirmationModal_title_3').text(" será eleminado. ¿Desea Continuar?")

  $('#removingConfirmationModal_yes_btn').on('click', () => {

      let data = {
        name: arr[1]
      }
    $.ajax({
      url: '/companies/delete',
      type: 'POST',
      data: data,
      success: function(r){
        $('#createdWarningModal_title_1').text("El Grupo Empresarial ")
        $('#createdWarningModal_title_2').text(arr[1])
        $('#createdWarningModal_title_3').text(" fué eliminado exitosamente!")
        $('#createdWarningModal').modal()
        companyDeployment()
      },
      error: function(res, err, error) {
        if(res.status == 505){
            alert("No se pudo conectar a la Base de Datos");
        }
        //console.log(err, data);
  }
  })
  })
})

//Status change button
$('#bf-datatable tbody').on( 'click', 'a.disable', function () {

  if($(window).width() < 768){
    var arr = $('#bf-datatable').DataTable().row($(this)).data();
  }
  else {
    var arr = $('#bf-datatable').DataTable().row($(this).parents("tr")).data();
  }


  var data = {
    name: arr[1],
    status: String(arr[2].split(" ")[3].split('"')[1])

  }

  $('#disablingConfirmationModal_title_1').text("El Grupo Empresarial ")
  $('#disablingConfirmationModal_title_2').text(arr[1])
  $('#disablingConfirmationModal_title_3').text(" será deshabilitado. ¿Desea Continuar?")

  //console.log(data.status);
  if (data.status == "Inactivo"){
    //Enables company status
    $.ajax({
      url: '/companies/enable',
      type: 'POST',
      data: data,
      success: function(r){
        /*$('#createdWarningModal_title_1').text("El Grupo Empresarial ")
        $('#createdWarningModal_title_2').text(arr[1])
        $('#createdWarningModal_title_3').text(" fué eliminado exitosamente!")
        $('#createdWarningModal').modal()
        //console.log("hola");
        companyDeployment()
      },
      error: function(res, err, error) {
        if(res.status == 505){
            alert("No se pudo conectar a la Base de Datos");
        }
        //console.log(err, data);
  }
  })
}else {

  //Disables Company status
  $('#disablingConfirmationModal').modal()
  $('#disablingConfirmationModal_yes_btn').on('click', ()=> {
        var request = $.ajax({
          url: '/companies/disable',
          type: 'POST',
          data: data,
          success: function(r){
            /*$('#createdWarningModal_title_1').text("El Grupo Empresarial ")
            $('#createdWarningModal_title_2').text(arr[1])
            $('#createdWarningModal_title_3').text(" fué eliminado exitosamente!")
            $('#createdWarningModal').modal()
            //console.log("hola");
            companyDeployment()
          },
          error: function(res, err, error) {
            if(res.status == 505){
                alert("No se pudo conectar a la Base de Datos");
            }
            //console.log(err, data);
      }
      })
      //request.abort()
  })

}

})

//Delete confirmation
/*$('#removingConfirmationModal_yes_btn').on('click' , () => {

})




$('#createdWarningModal').on('shown.bs.modal', ()=> {
    $('#companiesModalForm').modal("hide")
})

$('#createdWarningModal_ok_btn').on('click' , ()=> {
    $('#company_name').val("");
    $('#company_rnc').val("");

})



//Form Managment ---------------------------------------------------------------

//Form create Button
/*$('#companiesForm_create_btn').on('click', ()=> {

  //Manage the Empty Fields Warning blockquote
    var list = document.getElementById('emptyFieldsWarning_List');
    ////console.log(list.childNodes.length);
    if(list.childNodes.length >= 2){
      for(i=0  ; i < 1 ; i++){
          //console.log(list.childNodes[1].id);
          list.removeChild(list.childNodes[1]);
      }
    }

    //Resolves the fields in order to find if they are or not empty
    var emptyFields = [];
    var fieldStatus = "filled";

    for(i of $('#company_form_content div input')){
      //console.log(i.id);

      if(i.value == "" && i.id != "company_rnc"){
        emptyFields.push(i.name)
        fieldStatus = "empty"
      }
    }
    //console.log(fieldStatus);
    if (fieldStatus == "empty"){
      var node;
      var textnode;

      for(i of emptyFields){
        if ( i !=  "RNC"){
         node = document.createElement("li");
         textnode = document.createTextNode("- " +i);
        node.appendChild(textnode);
        document.getElementById('emptyFieldsWarning_List').appendChild(node);
        $('#emptyFieldsWarning_list_container').css('display','block')
          }
      }
    }
    else {
        $('#emptyFieldsWarning_list_container').css('display','none')
        //console.log($('#companiesForm_create_btn').text());

        if ($('#companiesForm_create_btn').text() == "Crear"){
        var data = {
          name: $('#company_name').val(),
          status: "1",
          rnc: $('#company_rnc').val(),
          creationDate: todayDate(),
          modificationDate: todayDate()
        };
        //console.log(data);

         //console.log($('#companiesForm_create_btn').text());

         //Ajax Call to insert data
         $.ajax({
           url: '/companies/create',
           type: 'POST',
           data: data,
           success: function(r){
             $('#createdWarningModal_title_1').text("El Grupo Empresarial ")
             $('#createdWarningModal_title_2').text($('#company_name').val())
             $('#createdWarningModal_title_3').text(" fué creado con exito!")
             $('#createdWarningModal').modal()

           },
           error: function(res, err, error) {
             if(res.status == 505){
                 alert("No se pudo conectar a la Base de Datos");
             }
             ////console.log(err, data);

       }
     })

       }else {

         var data = {
           name: $('#company_name').val(),
           rnc: $('#company_rnc').val(),
           modificationDate: todayDate()
         };

         $.ajax({
           url: '/companies/update',
           type: 'POST',
           data: data,
           success: function(r){
             $('#createdWarningModal_title_1').text("El Grupo Empresarial ha sido actualizado a ")
             $('#createdWarningModal_title_2').text($('#company_name').val())
             $('#createdWarningModal_title_3').text(" con exito!")
             $('#createdWarningModal').modal()
             companyDeployment()
           },
           error: function(res, err, error) {
             if(res.status == 505){
                 alert("No se pudo conectar a la Base de Datos");
             }
             //console.log(err, data);
       }
       })
  }
}
})



//Form refresh custom_btn_danger
$('#company_form_buscar_btn, #company_form_refresh_btn').on('click', ()=> {
    companyDeployment()
})

$('#companiesModalForm').on('shown.bs.modal', () => {
  if($('#companiesForm_create_btn').text() == "Actualizar"){
    //console.log("hola");
    var data = {
      oldName: $('#company_name').val()
    }
    $.ajax({
      url: '/companies/update',
      type: 'POST',
      data: data
    })
  }
})



function updateData(){

}

todayDate()



}

})
*/

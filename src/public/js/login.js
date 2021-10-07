

$('#login_send_btn').on('click' , () => {

  console.log($('#username').val());
  if ($('#username').val() == ""){
    console.log("hello");
    $('#emptyFields_span').text("Invalid username or password!")
    $('#emptyFieldsWarning_list_container').css('display','block')

  }



  var data = {
    username: $('#username').val(),
    password: $('#password').val()
  }



  $.ajax({
     type: 'POST',
     url: '/api/auth/signin',

     data: data,
     success: function(data){
       console.log(data.accessToken);
       sessionStorage.setItem('token', data.accessToken)
       $.ajax({
         type: 'GET',
         url: '/api/test/all',
         headers: {
            'x-access-token': sessionStorage.getItem('token')
         },
         success: function(data){
           console.log(data);
           window.location.href = '/dashboard';
         },
         error:  function(msg){
           console.log(msg);
         }
       })
     },
     error: function(err){
       console.log(err);
     }
  })
})


$('#to_mod').on('click', () => {
    console.log(sessionStorage.getItem('token'));
    $.ajax({
      type: 'GET',
      url: '/api/test/mod',
      headers: {
         'x-access-token': sessionStorage.getItem('token')
      },
      success: function(data){
        console.log(data);
        window.location.href = '/dashboard';
      },
      error:  function(msg){
        console.log(msg);
      }
    })
})



console.log($('#logout'));
console.log('hola');
$('#logout').on('click', () => {
console.log('hi');
  $.ajax({
    type: 'GET',
    url: '/api/auth/signout',
    success: function(data){
      console.log(data);
      window.location.href = '/login';
    }
  })
  /*console.log("hola");
   sessionStorage.removeItem('token')
   window.location.href = '/login'*/
})




/*,*/

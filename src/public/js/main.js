$('#href_contizaciones').on('click', () => {
    console.log("hello");
    data = {
      "body": "<html>hello</html>"
    }

    //$('#href_contizaciones').html("data")

    $.ajax({
      type: 'GET',
      url: '/api/test/all',
      success: function(data){
            //console.log(data);

                $('#view_content').html(data);
        }
    })
})

console.log($('#href_contizaciones'));
function sendContizationsCall() {
  console.log("hello");
}

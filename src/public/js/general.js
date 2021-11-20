$(document).ready(function() {

    // If cookie is set, scroll to the position saved in the cookie.
    if ( localStorage.getItem("scroll") !== null ) {
        $('#sidebar').scrollTop( localStorage.getItem("scroll") );
    }

    // When scrolling happens....
    $('#sidebar').on("scroll", function() {

        // Set a cookie that holds the scroll position.
        localStorage.setItem("scroll", $('#sidebar').scrollTop() );

    });

});


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
  if (today < 10){
    today = "0" + today;
  }

  date =  today + "-"+ currentMonth + "-"+ currentYear
  return date
}

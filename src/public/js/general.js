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

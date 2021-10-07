if($(window).width() < 768  ){
  if($('#sidebar').css("left") == "-250px"){
    $('#toggleSidebarBtnIcon').removeClass("fas fa-angle-left")
    $('#toggleSidebarBtnIcon').addClass("fas fa-bars")
  }

  $('#view_content').on('click' , () => {
      $('#sidebar').css("left" , "-250px");
      $('#toggleSidebarBtnIcon').removeClass("fas fa-angle-left");
      $('#toggleSidebarBtnIcon').addClass("fas fa-bars");
  })
}


//Sidebar Animation
$('#toggleSidebarBtn').on('click' , () => {


if ($(window).width() > 768){
//Closes the sidebar
    if($('#main').css('margin-left') == "250px"){
      $('#sidebar').css("left" , "-250px");
      $('#main').css('margin-left', 0)
      $('#toggleSidebarBtnIcon').removeClass("fas fa-angle-left")
      $('#toggleSidebarBtnIcon').addClass("fas fa-bars")
    }
    //Opens the sidebar
    else{
      $('#sidebar').css("left" , "0");
      $('#main').css('margin-left', '250px');
      $('#toggleSidebarBtnIcon').removeClass("fas fa-bars")
      $('#toggleSidebarBtnIcon').addClass("fas fa-angle-left")
    }
  }
  else {
    if($('#main').css('margin-left') == "250px"){
      $('#sidebar').css("left" , "-250px");
      $('#main').css('margin-left', 0)
      $('#toggleSidebarBtnIcon').removeClass("fas fa-angle-left")
      $('#toggleSidebarBtnIcon').addClass("fas fa-bars")
    }
    //Opens the sidebar
    else{
      $('#sidebar').css("left" , "0");
      $('#main').css('margin-left', '0');
      $('#toggleSidebarBtnIcon').removeClass("fas fa-bars")
      $('#toggleSidebarBtnIcon').addClass("fas fa-angle-left")
    }
  }

})



//Dashboard Animation
$('#sidebar_dashboard_dropdown, #sidebar_dashboard_dropdown_icon').on('click' , () => {
    sidebarCollapseModules( "#collapseDashboard", "#sidebar_dashboard_dropdown_icon")
})

//Sales Animation
$('#sidebar_sales_dropdown, #sidebar_sales_dropdown_icon').on('click' , () => {
    sidebarCollapseModules( "#collapseSales", "#sidebar_sales_dropdown_icon")
})

//Inventary Animation
$('#sidebar_inventary_dropdown, #sidebar_inventary_dropdown_icon').on('click' , () => {
    sidebarCollapseModules( "#collapseInventary", "#sidebar_inventary_dropdown_icon")
})

//Accountin Animation
$('#sidebar_accounting_dropdown, #sidebar_accounting_dropdown_icon').on('click' , () => {
    sidebarCollapseModules( "#collapseAccounting", "#sidebar_accounting_dropdown_icon")
})

//RRHH animation
$('#sidebar_rrhh_dropdown, #sidebar_rrhh_dropdown_icon').on('click' , () => {
    sidebarCollapseModules( "#collapseRrhh", "#sidebar_rrhh_dropdown_icon")
})

// Configuration Animation
$('#sidebar_config_dropdown, #sidebar_config_dropdown_icon').on('click' , e => {
  sidebarCollapseModules("#collapseConfig", "#sidebar_config_dropdown_icon")
})















function sidebarCollapseModules(listId, iconId){
  console.log($(`${listId}`));
  console.log($(`${iconId}`));
  if ($(`${listId}`).is(':visible')){
  $(`${iconId}`).removeClass("fas fa-angle-up")
  $(`${iconId}`).addClass("fas fa-angle-down")
  }
  else{
    $(`${iconId}`).removeClass("fas fa-angle-down")
    $(`${iconId}`).addClass("fas fa-angle-up")
  }
  $(`${listId}`).slideToggle("fast")
}

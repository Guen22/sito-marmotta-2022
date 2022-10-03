(function () {

  $(".myButton").click(function() {
    $("#homepage").fadeOut("slow");
    setTimeout(function(){ $("#testata").fadeIn("slow"); }, 1000);
  });

})();


/*************************************** PROVA *******************************/
$('[data-toggle="collapse"]').on('click',function(){
    $('.collapse').collapse('hide');
    $('.row.in').removeClass("in");
    $(this).parents('.row').addClass("in");
});

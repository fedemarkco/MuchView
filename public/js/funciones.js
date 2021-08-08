$(document).ready ( function() {
console.log('listo');
$("#letrasbg").click(function(event){
    event.stopPropagation();
    $('.letras-int').animate({"left":"-300px"}, 280).hide(280);
    $('#letrasbg').animate({"left":"-300px"}, 280).hide();
});

$("span#menu").click(function(event){
    event.stopPropagation();
    $('.letras-int').show().animate({"left":"0px"}, 280);
    $('#letrasbg').show().animate({"left":"0px"}, 280);
});

 // Slider function
 $('#nivo1').nivoSlider({
   effect: 'random',
   pauseTime: 6000
 });
 
 $("ul.tabs").tabs("div.panes > div", {effect: 'fade'});
 $("ul.tab-day").tabs("div.day-boxed > div", {effect: 'fade'});
  $("ul.disc-tabs").tabs("div.comment-it > div", {effect: 'fade'});
  $("ul.server-tab").tabs("div.server-box > div", {effect: 'fade'});
 
 $(".rss-icon[title], .buttons[title], .letra-link[title], .box-link a[title], .vnav-list[title]").tooltip();
 
 $('#slider1').tinycarousel({
   axis   : "y",
   infinite: false
 });
 
  $('#slider2').tinycarousel({
   axis   : "y",
   infinite: false
 });
 
 $("#slider3").tinycarousel({
    axis   : "y",
    infinite : false
  });
 
 $('.topten-ul li').hover( function() { 
   $(this).find('.medium-play').slideToggle("fast");
   $(this).find('.big-play').slideToggle("fast");
   $(this).find('.small-play').slideToggle("fast");
 });
 
 $('.let-post').hover( function() { 
   $(this).find('.let-link').slideToggle("fast");
 });
 
  $('.cap-post').hover( function() { 
   $(this).find('.cap-play').slideToggle("fast");
 });
 
 // Button genero
 
 $('.box-link.id a').click ( function() {
  $(this).html($(this).html() == 'Cerrar X' ? 'Idioma &darr;' : 'Cerrar X');
  $('.language-list').slideToggle("fast");
 return false;
 });
 $('.box-link.tp a').click ( function() {
   $(this).html($(this).html() == 'Cerrar X' ? 'Tipo &darr;' : 'Cerrar X');
   $('.type-list').slideToggle("fast");
  return false;
 });
  $('.box-link.lt a').click ( function() {
   $(this).html($(this).html() == 'Cerrar X' ? 'Género &darr;' : 'Cerrar X');
   $('.genre-list').slideToggle("fast");
    return false;
 });
 // excerpt top
 
 $('.top-post').hover( function() { 
  $(this).find('.the-excerpt').fadeIn("fast");
 });
 
 $('.top-post').mouseleave( function() { 
  $(this).find('.the-excerpt').fadeOut("fast");
 });
 
 // Scroll ads
 var length = $('#content').height() - $('.adix').height() + $('#content').offset().top;

    $(window).scroll(function () {

        var scroll = $(this).scrollTop();
        var height = $('.adix').height() + 'px';

        if (scroll < $('#content').offset().top) {

            $('.adix').css({
                'position': 'absolute',
                'top': '0'
            });

        } else if (scroll > length) {

            $('.adix').css({
                'position': 'absolute',
                'bottom': '0',
                'top': 'auto'
            });

        } else {

            $('.adix').css({
                'position': 'fixed',
                'top': '0',
                'height': height
            });
        }
    });
  

  $('.accordian li:odd:gt(0)').hide();

  $('.accordian li:odd').addClass('dimension');
  $('.accordian li:even:even').addClass('even');
  $('.accordian li:even:odd').addClass('odd');

  $('.accordian li:even').css('cursor', 'pointer');

  $('.accordian li:even').click( function() {
    var cur = $(this).next();
    var old = $('.accordian li:odd:visible');

    if ( cur.is(':visible') )
      return false;

    old.slideToggle(500);
    cur.stop().slideToggle(500);

  } );


    $('#dwld').click(function (e) {
        $('#basic-modal-content').modal();
        return false;
    });

  
});
(function($){
    $(document).ready(function(){
        if ($(window).width() < 850) {
            var searchForm = $('#topnav .form_search2');
            var searchFormHeaderParent = searchForm.parent();
            var searchFormBurgerMenu = searchForm.find('#menu');
            var offCanvasMenu = $('#container #letrasint');

            searchFormHeaderParent.append(searchFormBurgerMenu);
            offCanvasMenu.prepend(searchForm);

            ///////

            var title = $('#container > .serie-info h2').first();
            var infoBox = $('#container > .serie-info .info-content');
            title.remove();

            infoBox.prepend(title);
        } 
    });
})(jQuery);
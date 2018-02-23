$(document).ready(function(){ 
	var touch 	= $('#touch-menu');
	var menu 	= $('.menu');

	$(touch).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});
	
	$(window).resize(function(){
		var w = $(window).width();
		if(w > 767 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
	
});
if(window.matchMedia('(max-width: 768px)').matches)
{
  $('.sub-menu-button').on('click',function(e)
  {
    var subMenu = $(this).next('.sub-navigation');
    if(subMenu.is(':visible'))
    {
      subMenu.slideUp();
    } else {
      subMenu.slideDown();
    }
     
    return false;
  });
}
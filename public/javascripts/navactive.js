$(function () {
    var url = window.location.href;
    var menus = ['login', 'reg', 'logout', 'help'];
    var i;
    var str;
    var flag = false;
    for (i = 0; i < menus.length; i++){
	str = menus[i];
	if (url.indexOf(str) !== -1){
	    $('.nav > li > a[href*="' + str + '"]')[0].parentNode.className = 'active';
	    flag = true;
	    break;
	}
    }
    if (!flag){
	$('.nav > li:first-child').addClass('active');
    }
});

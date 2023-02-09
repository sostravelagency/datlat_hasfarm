/*=========================================*/
/*Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position*/
function sticky_menu(menu, sticky) {
    if (typeof menu === 'undefined' || !jQuery.isNumeric(sticky)) sticky = 0;
    if ($(window).scrollTop() >= sticky) {
        if ($('#just-for-height').length === 0) {
            menu.after('<div id="just-for-height" style="height:' + menu.height() + 'px"></div>')
        }
        menu.addClass("sticky");
    } else {
        menu.removeClass("sticky");
        $('#just-for-height').remove();
    }
}
$(document).ready(function() {
    /*Get the navbar*/
    var menu = $("body > header");
    /*Get the offset position of the navbar*/
    var sticky = menu.offset().top + 1;
    /*When the user scrolls the page, execute myFunction*/
    if ($(window).width() > 767) {
        /*sticky_menu(menu, sticky);*/
        $(window).on('scroll', function() {
            /*sticky_menu(menu, sticky);*/
        });
    }
    $('.pt_menu').hover(function() {
        /*show popup to calculate*/
        $(this).find('.popup').css('display', 'inline-block');

        /* get total padding + border + margin of the popup */
        var extraWidth = 0
        var wrapWidthPopup = $(this).find('.popup').outerWidth(true); /*include padding + margin + border*/
        var actualWidthPopup = $(this).find('.popup').width(); /*no padding, margin, border*/
        extraWidth = wrapWidthPopup - actualWidthPopup;

        /* calculate new width of the popup*/
        var widthblock1 = $(this).find('.popup .block1').outerWidth(true);
        var widthblock2 = $(this).find('.popup .block2').outerWidth(true);
        var new_width_popup = 0;
        if (widthblock1 && !widthblock2) {
            new_width_popup = widthblock1;
        }
        if (!widthblock1 && widthblock2) {
            new_width_popup = widthblock2;
        }
        if (widthblock1 && widthblock2) {
            if (widthblock1 >= widthblock2) {
                new_width_popup = widthblock1;
            }
            if (widthblock1 < widthblock2) {
                new_width_popup = widthblock2;
            }
        }
        var new_outer_width_popup = new_width_popup + extraWidth;

        /*define top and left of the popup*/
        var wraper = $('.pt_custommenu');
        var wWraper = wraper.outerWidth();
        var posWraper = wraper.offset();
        var pos = $(this).offset();

        var xTop = pos.top - posWraper.top + CUSTOMMENU_POPUP_TOP_OFFSET;
        var xLeft = pos.left - posWraper.left;
        if ((xLeft + new_outer_width_popup) > wWraper) xLeft = wWraper - new_outer_width_popup;

        $(this).find('.popup').css('top', xTop);
        $(this).find('.popup').css('left', xLeft);

        /*set new width popup*/
        $(this).find('.popup').css('width', new_width_popup);
        $(this).find('.popup .block1').css('width', new_width_popup);

        /*return popup display none*/
        $(this).find('.popup').css('display', 'none');

        /*show hide popup*/
        if (CUSTOMMENU_POPUP_EFFECT == 0) $(this).find('.popup').stop(true, true).slideDown('slow');
        if (CUSTOMMENU_POPUP_EFFECT == 1) $(this).find('.popup').stop(true, true).fadeIn('fast');
        if (CUSTOMMENU_POPUP_EFFECT == 2) $(this).find('.popup').stop(true, true).show('slow');
    }, function() {
        if (CUSTOMMENU_POPUP_EFFECT == 0) $(this).find('.popup').stop(true, true).slideUp();
        if (CUSTOMMENU_POPUP_EFFECT == 1) $(this).find('.popup').stop(true, true).fadeOut('fast');
        if (CUSTOMMENU_POPUP_EFFECT == 2) $(this).find('.popup').stop(true, true).hide('fast');
    });
});
/*=========================================*/
/* check current page in menu header */
var curren_page = $('#mp_header .main-nav a[href="' + window.location.href + '"]');
curren_page.parent().addClass('active');
curren_page.closest('.main-nav > li').addClass('active');
/* check current page in category */
$('.aside-item.sidebar-category li.lv2.active').closest('li.lv1').addClass('active');
$('.aside-item.sidebar-category li.lv2 a[href="' + window.location.href + '"]').parent().addClass('active').closest('li.lv1').addClass('active');
$(document).ready(function() {
    /* fix pagination */
    /*$('.pagination').addClass('clearfix');
    $('.pagination > li').addClass('page-item');
    $('.pagination > li > *').addClass('page-link');*/
});
/*=========================================*/
var desktop_currency = $('#mp_header .top-header .container .right .currency');
var desktop_search = $('#mp_header .top-header .container .right .searchbox');
var desktop_cart = $('#mp_header .bottom-header .mini-cart #cart');
if ($(window).width() < 992) {}
$(window).resize(function() {
    if ($(window).width() < 992) {} else {}
});
$(window).scroll(function() {});
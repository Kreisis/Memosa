var initialNavbarHeight = 100;
var target = 200;
$(document).ready(function () {
    if (target < $(this).scrollTop) {
        $('nav').css('background', 'rgba(0,0,0,1)');

        $(".navbar-default .navbar-brand").css({
            'height': 50 + 'px',
            'line-height': 50 + 'px'
        });
        $(".navbar-default .navbar-toggle").css('margin-top', 8 + 'px');

        if ($(".navbar-nav > li > a").css('line-height') == 27 + 'px') {
            $(".resizable").css({
                'padding-bottom': 11.5 + 'px',
                'padding-top': 11.5 + 'px'
            });
        }
    }
});

$(window).resize(function () {
    if ($(".navbar-nav > li > a").css('line-height') != 27 + 'px') {
        $(".resizable").css({
            'padding-bottom': 11.5 + 'px',
            'padding-top': 11.5 + 'px'
        });
    }
    else {
        $(".resizable").css({
            'padding-bottom': ((initialNavbarHeight - ($(this).scrollTop() / (target * 2)) * 100) - 27) / 2 + 'px',
            'padding-top': ((initialNavbarHeight - ($(this).scrollTop() / (target * 2)) * 100) - 27) / 2 + 'px'
        });
    }
});

$(document).scroll(function () {
    
    if (target >= $(this).scrollTop()) {
        $('nav').css('background', 'rgba(0,0,0,' + (0.8 + $(this).scrollTop() / (target*5)) + ')');

        $(".navbar-default .navbar-brand").css({
            'height': initialNavbarHeight - ($(this).scrollTop() / (target * 2)) * 100 + 'px',
            'line-height': initialNavbarHeight - ($(this).scrollTop() / (target * 2)) * 100 + 'px'
        });
        $(".navbar-default").css('min-height', initialNavbarHeight - ($(this).scrollTop() / (target * 2)) * 100 + 'px');

        $(".navbar-default .navbar-toggle").css('margin-top', ((initialNavbarHeight - ($(this).scrollTop() / (target * 2)) * 100) - 34) / 2 + 'px');

        if ($(".navbar-nav > li > a").css('line-height') == 27+'px') {
            $(".resizable").css({
                'padding-bottom': ((initialNavbarHeight - ($(this).scrollTop() / (target * 2)) * 100)-27)/2 + 'px',
                'padding-top': ((initialNavbarHeight - ($(this).scrollTop() / (target * 2)) * 100) - 27) / 2 + 'px'
            });
        }
    }
    else {
        $('nav').css('background', 'rgba(0,0,0,1)');

        $(".navbar-default .navbar-brand").css({
            'height': 50 + 'px',
            'line-height': 50 + 'px'
        });

        $(".navbar-default .navbar-toggle").css('margin-top', 8 + 'px');

        $(".navbar-default").css('min-height', 50 + 'px');
        if ($(".navbar-nav > li > a").css('line-height') == 27 + 'px') {
            $(".resizable").css({
                'padding-bottom': 11.5 + 'px',
                'padding-top': 11.5 + 'px'
            });
        }
    }
    
});
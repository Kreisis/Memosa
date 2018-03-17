fontsize = function () {
    var fontSize = $(".thumbnail-img").width() * 0.06; // 10% of container width
    $(".thumbnail-text").css('font-size', fontSize);
};
$(window).resize(fontsize);
$(document).ready(fontsize);
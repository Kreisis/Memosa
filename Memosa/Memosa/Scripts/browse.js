fontsize = function () {
    var fontSize = $(".thumbnail-img").width() * 0.06; // 10% of container width
    $(".thumbnail-text").css('font-size', fontSize);
};

$(window).resize(fontsize);
$(document).ready(fontsize);

page = 1;
ajaxLoading = false;
endReached = false;

$(document).ready(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        GetData();
    }
    fontsize;
    
    function GetData() {
        $.ajax(
            {
                type: "GET",
                url: "/Home/GetBrowseThumbnailData?page=" + page,
                dataType: "html",
                success: function (data) {
                    page++;
                    if (!$.trim(data)) {
                        console.log("End reached");
                        endReached = true;
                    }
                    else {
                        $("#thumbnail-container").append(data);
                    }
                    ajaxLoading = false;
                    $(".load-animation-bubble").toggle();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus); alert("Error: " + errorThrown);
                }
            }
            );
    }
    $(window).scroll(function () {
        if (Math.abs($(window).scrollTop() - ($(document).height() - $(window).height())) < $(window).height()/10 && ajaxLoading==false && !endReached) {
            $(".load-animation-bubble").toggle();
            ajaxLoading = true;
            GetData();
        }
    });
});
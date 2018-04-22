var minQueryLength = 2;
var maxQueryLength = 200;
var page = 1;
var endReached = false;
var ajaxLoading = false;
var searchEngaged = false;

var lastRequest = "";

fontsize = function () {
    var fontSize = $(".thumbnail-img").width() * 0.06; // 10% of container width
    $(".thumbnail-text").css('font-size', fontSize);
};

$(window).resize(fontsize);

$(document).ready(function () {
    fontsize;
    $(".load-animation-bubble").toggle();

    function GetData(query) {
        $.ajax(
            {
                type: "GET",
                url: "/Home/GetSearchResults?page=" + page + "&query=" + query,
                dataType: "html",
                success: function (data) {
                    page++;
                    if (!$.trim(data)) {
                        endReached = true;
                        if ($("#thumbnail-container div").length < 1) {
                            $("#text-no-results").css("display", "initial");
                        }
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

    $("#search-input").add(addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            $("#input-button").click();
        }
    }));

    $("#input-button").on("click", function () {
        $("#text-no-results").css("display", "none");
        searchEngaged = true;
        endReached = false;
        $("#thumbnail-container").html(null)
        page = 1;
        var query = $("#search-input").val();
        
        query = query.trim();

        if (query.length == 0 || endReached) {
            return;
        }

        $("#text-before-search").css("display", "none");

        if (query.length < minQueryLength || query.length > maxQueryLength) {
            $("#text-no-results").css("display", "initial");
            return;
        }
        query = encodeURI(query);
        
        if (!ajaxLoading) {
            lastRequest = query;
            ajaxLoading = true;
            GetData(query);
            $(".load-animation-bubble").toggle();
        }
    });

    if ($("#search-input").val().trim()) {
        $("#input-button").click();
    }

    $(window).scroll(function () {
        if (Math.abs($(window).scrollTop() - ($(document).height() - $(window).height())) <
            $(window).height() / 10 && !ajaxLoading && !endReached && searchEngaged && 
            $.trim(lastRequest)) {

            $(".load-animation-bubble").toggle();
            ajaxLoading = true;
            GetData(lastRequest);
        }
    });

});
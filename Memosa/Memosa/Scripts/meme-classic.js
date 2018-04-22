var numberOfInputs = 1;
var numberOfActiveInputs = 1;
var defaultTopValue = 20;
var defaultTopMultiplier = 30;
var defaultTextColor = "rgb(255, 255, 255)";
var defaultOutlineColor = "rgb(0, 0, 0)";
var defaultFont = "Impact";
var defaultFontSize = 80;
var defaultOutlineSize = "2";
var fontOptions = ["Impact", "Comic Sans MS", "Times New Roman"];

var minimalFontSize = 10;
var maximumFontSize = 250;

function drawCanvas() {
    var canvas = document.getElementById("canvas1");
    var image = document.getElementById("source-img");
    var textToDraw = $("#input1").val();

    canvas.width = image.width * 2;
    canvas.height = image.height * 2;

    var context = canvas.getContext("2d");
    context.scale(2, 2);

    context.drawImage(image, 0, 0, $("#source-img").width(), $("#source-img").height());

    //Draw DOM

    var html = $("#image-texts-holder").html();

    //Possible bug down below
    DrawDOM(html, context, 0, 0, image.width, image.height);
}

function DrawDOM(html, context, x, y, width, height) {
    var data = "data:image/svg+xml;charset=utf-8," + '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                        '<foreignObject width="100%" height="100%">' +
                        '<div xmlns="http://www.w3.org/1999/xhtml" >' +
                            HTMLToXML(html) +
                        '</div>' +
                        '</foreignObject>' +
                        '</svg>';

    var img = new Image();
    
    img.onload = function () {
        context.drawImage(img, x, y);
    }
    img.src = data;
}

function HTMLToXML(html) {
    /*var doc = document.implementation.createHTMLDocument('');
    doc.write(html);

    doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);

    html = (new XMLSerializer).serializeToString(doc.body);
    html = new XMLSerializer().serializeToString(html);
    console.log(html);*/
    return html;
}

function MakeDraggable(id) {
    $("#" + id).draggable({
        containment: "parent",
        drag: function () {
            drawCanvas();
        }
    });
}
function MakeResizable(id) {
    $("#"+id).resizable({
        containment: "parent",
        grid: [1, 10000],
        resize: function () {
            drawCanvas();
        }
    });
}
function calibrateDefaultValues(width) {
    if (width > 1200) {
        defaultFontSize = 80;
        defaultTopMultiplier = 30;
        defaultTopValue = 20;
    }
    else if (width <= 1200 && width > 768) {
        defaultFontSize = 60;
        defaultTopValue = 10;
        defaultTopMultiplier = 15;
    }
    else {
        maximumFontSize = 150;
        defaultFontSize = 40;
        defaultTopValue = 0;
        defaultTopMultiplier = 10;
    }
}
function validateOutlineSize(font, value) {
    var min = 0;
    var max;
    if (font > 240 && font <= 250) {
        max = 10;
    }
    else if (font <= 240 && font > 200) {
        max = 9;
    }
    else if(font <= 200 && font > 170){
        max = 8;
    }
    else if (font <= 170 && font > 150) {
        max = 7;
    }
    else if (font <= 150 && font > 130) {
        max = 6;
    }
    else if (font <= 130 && font > 105) {
        max = 5;
    }
    else if (font <= 105 && font > 80) {
        max = 4;
    }
    else if (font <= 80 && font > 64) {
        max = 3;
    }
    else if (font <= 64 && font > 39) {
        max = 2;
    }
    else if (font <= 39 && font > 15) {
        max = 1;
    }
    else {
        max = 0;
    }

    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    else {
        return value;
    }
}
function CreateInput() {
    var newRow = document.createElement("div");
    $(newRow).attr({
        "class": "row row-eq-height"
    });

    var newColLg = document.createElement("div");
    $(newColLg).attr({
        "class": "col-md-9 col-sm-7 col-lg-9 col-xs-7"
    });

    var newColSm = document.createElement("div");
    $(newColSm).attr({
        "class": "col-md-2 col-sm-3 col-lg-2 col-xs-3"
    });

    var newColSm2 = document.createElement("div");
    $(newColSm2).attr({
        "class": "col-md-1 col-sm-2 col-lg-1 col-xs-2"
    });

    var newButton = document.createElement("button");
    $(newButton).attr({
        "class": "open-modal-button",
        "data-toggle": "modal",
        "data-target": "#modal" + numberOfInputs
    });

    var newButton2 = document.createElement("button");
    $(newButton2).attr({
        "class": "delete-input-button",
        "target-input": numberOfInputs
    });

    var newI = document.createElement("i");
    $(newI).attr({
        "class": "fas fa-cog"
    });
    var newIClose = document.createElement("i");
    $(newIClose).attr({
        "class": "far fa-times-circle"
    });

    var newInput = document.createElement("input");
    $(newInput).attr({
        "id": "input" + numberOfInputs,
        "type": "text",
        "target-text": numberOfInputs,
        "class": "form-control text-input",
        "placeholder": "Text " + numberOfInputs,
        "aria-describedby": "basic-addon1"
    });

    $(newColLg).append(newInput);
    $(newRow).append(newColLg);

    $(newButton).append(newI);
    $(newColSm).append(newButton);
    $(newRow).append(newColSm)

    $(newButton2).append(newIClose);
    $(newColSm2).append(newButton2);
    $(newRow).append(newColSm2);

    $("#control-inputs").append(newRow);

    var newText = document.createElement("h1");
    $(newText).attr({
        "id": "text" + numberOfInputs,
        "class": "ui-widget-content meme-text",
    });
    var df = validateOutlineSize((parseFloat(defaultFontSize) * 72.0 / 96.0).toFixed(2), defaultOutlineSize)
    $(newText).css({
        "font-weight": "500",
        "font-stretch": "normal",
        "line-height": "105%",
        "padding": "0px",
        "margin": "0px",
        "position": "absolute",
        "top": Math.min(defaultTopValue + numberOfActiveInputs*defaultTopMultiplier, $("#source-img").height()-defaultFontSize * 1.5  - defaultTopValue) + "px",
        "width": "100%",
        "color": "rgb(255, 255, 255)",
        "text-align": "center",
        "right": "auto",
        "left": "auto",
        "font-family": defaultFont,
        "font-size": defaultFontSize + "pt",
        "letter-spacing": "2pt",
        "overflow": "hidden",
        "text-shadow": (defaultOutlineColor + " -" + df + "pt " + "-" + df + "pt " + "0pt," +
            defaultOutlineColor + " " + df + "pt -" + df + "pt 0pt," +
            defaultOutlineColor + " -" + df + "pt " + df + "pt 0pt," +
            defaultOutlineColor + " " + df + "pt " + df + "pt 0pt")
    });
    $(newText).html("Text " + numberOfInputs);

    $("#image-texts-holder").append(newText);

    MakeDraggable("text" + numberOfInputs);
    MakeResizable("text" + numberOfInputs);

}
function CreateModal() {
    var modalFade = document.createElement("div");
    $(modalFade).attr({
        "class": "modal fade",
        "id": "modal" + numberOfInputs,
        "tabindex": "-1",
        "role": "dialog",
        "aria-labelledby": "modalTitle" + numberOfInputs,
        "aria-hidden": "true"
    });

    var modalDialog = document.createElement("div");
    $(modalDialog).attr({
        "class": "modal-dialog modal-dialog-centered",
        "role": "document"
    });

    $(modalFade).append(modalDialog);

    var modalContent = document.createElement("div");
    $(modalContent).attr({
        "class": "modal-content"
    });

    $(modalDialog).append(modalContent);

    var modalHeader = document.createElement("div");
    $(modalHeader).attr({
        "class": "modal-header"
    });

    $(modalContent).append(modalHeader);

    var modalTitle = document.createElement("h5");
    $(modalTitle).attr({
        "class": "modal-title",
        "id": "modalTitle" + numberOfInputs
    });
    $(modalTitle).html("Customize Text " + numberOfInputs + " options");

    $(modalHeader).append(modalTitle);

    var modalHeadCloseButton = document.createElement("button");
    $(modalHeadCloseButton).attr({
        "type": "button",
        "class": "close",
        "data-dismiss": "modal",
        "aria-label": "Close"
    });
    $(modalHeader).append(modalHeadCloseButton);

    $(modalHeadCloseButton).html('<i class="far fa-window-close"></i>');

    /*var modalHeadCloseButtonSpan = document.createElement("span");
    $(modalHeadCloseButtonSpan).attr({
        "aria-hidden": "true"
    });
    $(modalHeadCloseButtonSpan).html("&times;");

    $(modalHeadCloseButton).append(modalHeadCloseButtonSpan);*/

    var modalBody = document.createElement("div");
    $(modalBody).attr({
        "class": "modal-body"
    });
    $(modalContent).append(modalBody);

    //Row1
    var row = document.createElement("div");
    $(row).attr({
        "class": "row"
    });
    $(modalBody).append(row);

    var rowSpan = document.createElement("h3");
    $(rowSpan).html("Font");
    

    var rowSelector = document.createElement("select");
    $(rowSelector).attr({
        "class": "selectpicker",
        "target-text": numberOfInputs
    });

    for(i = 0; i < fontOptions.length; i++){
        var opt = document.createElement("option");
        $(opt).html(fontOptions[i]);
        $(rowSelector).append(opt);
    }

    $(row).append(rowSpan);
    $(row).append(rowSelector);

    //Row2
    var row = document.createElement("div");
    $(row).attr({
        "class": "row"
    });
    $(modalBody).append(row);

    var rowSpan = document.createElement("h3");
    $(rowSpan).html("Font Size");


    var rowInput = document.createElement("input");
    $(rowInput).attr({
        "class": "font-size-selector",
        "type": "number",
        "target-text": numberOfInputs,
        "value": defaultFontSize
    });

    $(row).append(rowSpan);
    $(row).append(rowInput);

    //Row3
    var row = document.createElement("div");
    $(row).attr({
        "class": "row"
    });
    $(modalBody).append(row);

    var rowSpan = document.createElement("h3");
    $(rowSpan).html("Font Color");


    var rowInput = document.createElement("input");
    $(rowInput).attr({
        "class": "font-color-picker",
        "id": "font-color-picker-" + numberOfInputs,
        "type": "text",
        "target-text": numberOfInputs
    });

    $(row).append(rowSpan);
    $(row).append(rowInput);

    //Row4
    var row = document.createElement("div");
    $(row).attr({
        "class": "row"
    });
    $(modalBody).append(row);

    var rowSpan = document.createElement("h3");
    $(rowSpan).html("Outline Size");


    var rowInput = document.createElement("input");
    $(rowInput).attr({
        "id": "outline-size-selector-"+numberOfInputs,
        "class": "outline-size-selector",
        "type": "number",
        "target-text": numberOfInputs,
        "value": defaultOutlineSize
    });

    $(row).append(rowSpan);
    $(row).append(rowInput);

    //Row5
    var row = document.createElement("div");
    $(row).attr({
        "class": "row"
    });
    $(modalBody).append(row);

    var rowSpan = document.createElement("h3");
    $(rowSpan).html("Outline Color");

    var rowInput = document.createElement("input");
    $(rowInput).attr({
        "class": "outline-color-picker",
        "id": "outline-color-picker-" + numberOfInputs,
        "type": "text",
        "target-text": numberOfInputs
    });

    $(row).append(rowSpan);
    $(row).append(rowInput);

    //End of Rows

    var modalFooter = document.createElement("div");
    $(modalFooter).attr({
        "class": "modal-footer"
    });

    $(modalContent).append(modalFooter);

    var modalFooterCloseButton = document.createElement("button");
    $(modalFooterCloseButton).attr({
        "type": "button",
        "class": "btn btn-primary",
        "data-dismiss": "modal"
    });
    $(modalFooterCloseButton).html("Close");
    $(modalFooter).append(modalFooterCloseButton);

    //End
    $("#modal-container").append(modalFade);

    $("#font-color-picker-" + numberOfInputs).spectrum({
        color: defaultTextColor,
        preferredFormat: "rgb",
        move: function (color) {
            var colorStr = color.toRgbString();
            var targetIndex = $(this).attr("target-text");
            var target = "#text" + $("#font-color-picker-" + targetIndex).attr("target-text");
            $(target).css("color", colorStr);
            drawCanvas();
        }
    });

    $("#outline-color-picker-" + numberOfInputs).spectrum({
        color: defaultOutlineColor,
        preferredFormat: "rgb",
        move: function (color) {
            var colorStr = color.toRgbString();
            var targetIndex = $(this).attr("target-text");
            var target = "#text" + $("#font-color-picker-" + targetIndex).attr("target-text");
            var outlineSize = $("#outline-size-selector-" + targetIndex).val();
            var newShadow = (colorStr + " -" + outlineSize + "pt " + "-" + outlineSize + "pt " + "0pt," +
            colorStr + " " + outlineSize + "pt -" + outlineSize + "pt 0pt," +
            colorStr + " -" + outlineSize + "pt " + outlineSize + "pt 0pt," +
            colorStr + " " + outlineSize + "pt " + outlineSize + "pt 0pt")
            $(target).css("text-shadow", newShadow);
            drawCanvas();
        }
    });
}
$(window).on("load", function () {
    calibrateDefaultValues($(window).width());
    CreateInput();
    CreateModal();
    drawCanvas();
});
$(window).on('resize', function (e) {
    if (e.target === this) {
        window.resizeEvt;
        $(window).resize(function () {
            clearTimeout(window.resizeEvt);
            window.resizeEvt = setTimeout(function () {
                window.location.href = window.location.href;
            }, 250);
        });
    }
});
$(document).ready(function () {
    //Update text
    $(document).on("click", ".delete-input-button", function () {
        var targetIndex = $(this).attr("target-input");
        $("#text" + targetIndex).remove();
        $("#modal" + targetIndex).remove();
        $(this).parent().parent().remove();

        drawCanvas();
    });
    $(document).on("keyup", ".text-input", function () {
        var target = $("#text" + $(this).attr("target-text"));
        target.resizable("destroy");
        target.html($(this).val());
        MakeResizable(target.attr("id"));

        drawCanvas();
    });
    $(document).on("change", ".selectpicker", function () {
        var target = $("#text" + $(this).attr("target-text"));
        var selected = $(this).val();
        target.css("font-family", selected);

        drawCanvas();
    });
    $(document).on("change", ".font-size-selector", function () {
        var target = $("#text" + $(this).attr("target-text"));
        var selected = $(this).val();
        if (selected < minimalFontSize) {
            selected = minimalFontSize;
            $(this).val(selected);
        }
        else if (selected > maximumFontSize) {
            selected = maximumFontSize;
            $(this).val(selected);
        }
        target.css("font-size", selected + "pt");
        $("#outline-size-selector-" + $(this).attr("target-text")).change();

        drawCanvas();
    });

    $(document).on("change", ".outline-size-selector", function () {
        var target = $("#text" + $(this).attr("target-text"));
        var colorStr = $("#outline-color-picker-" + $(this).attr("target-text")).spectrum("get");
        var outlineSize = $(this).val();
        console.log((parseFloat(target.css("font-size")) * 72.0 / 96.0).toFixed(2));
        outlineSize = validateOutlineSize((parseFloat(target.css("font-size")) * 72.0 / 96.0).toFixed(2), outlineSize);
        $(this).val(outlineSize);

        var newShadow = (colorStr + " -" + outlineSize + "pt " + "-" + outlineSize + "pt " + "0pt," +
            colorStr + " " + outlineSize + "pt -" + outlineSize + "pt 0pt," +
            colorStr + " -" + outlineSize + "pt " + outlineSize + "pt 0pt," +
            colorStr + " " + outlineSize + "pt " + outlineSize + "pt 0pt");
        if (outlineSize == 0) {
            newShadow = "none";
        }
        $("#text" + $(this).attr("target-text")).css("text-shadow", newShadow);
        drawCanvas();
    });

    //Add input box
    $("#add-button").click(function () {
        numberOfInputs++;
        numberOfActiveInputs++;

        CreateInput();
        CreateModal();

        drawCanvas();
    });


    //Save Canvas
    $("#save-button").click(function () {
        var canvas = document.getElementById("canvas1");

        var dataURL = canvas.toDataURL();
        
        $("#preview-img").attr("src", dataURL);
    });
    
    $(document).on("click", "#download-button", function () {
        var data = $("#preview-img").attr("src");
        var elem = window.document.createElement('a');
        elem.href = data;
        elem.download = "Meme";
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    });
});
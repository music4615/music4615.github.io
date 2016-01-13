$.fn.tagName = function() {
    return this.prop("tagName").toLowerCase();
}

function CountTag(dom, tagDictionary) {
    if (dom.childNodes.length !== 0) {
        for (var i = 0; i < dom.childNodes.length; i++) {
            CountTag(dom.childNodes[i], tagDictionary);
        }
    }
    var tag = $(dom).tagName();
    if (tag !== undefined) {
        if (!(tag in tagDictionary)) {
            tagDictionary[tag] = 1;
        } else {
            tagDictionary[tag] += 1;
        }
    }
}

function TagSummary(htmlText) {
    var header = $("<h2></h2>").text("HTML Tags Summary");
    $("#tagSummary").empty();
    $("#tagSummary").append(header);
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(htmlText, "text/html");
    var tagDic = new Array();
    CountTag(htmlDoc, tagDic);

    var ul = $("<ul id='tagList'></ul>");
    for (var tag in tagDic) {
        console.log(tag);
        var li = $("<li></li>");
        var ele = $("<span class='tag' id='" + tag + "'></span>");
        $(ele).text("&lt;" + tag + "&gt;");
        $(li).append(ele);
        $(li).append(": " + tagDic[tag]);
        $(ul).append(li);
    }
    $("#tagSummary").append(ul);
}

function GenPage(data) {
    console.log("Success");
    var dataTransform = data.replace(/&/gm, "&amp;").replace(/</gm, "&lt;")
                            .replace(/>/gm, "&gt;");
    var str = "<h2>HTML Document</h2><pre>" + dataTransform + "</pre>";
    document.getElementById("htmlSource").innerHTML = (str);
    TagSummary(data);
}

function Failure() {
    console.log("Error");
    document.getElementById("htmlSource").innerHTML = "Cannot load page";
}

$(function () {
    $("#submit").on('click', function() {
        $.ajax({
            url: document.getElementById("url").value,
            method: "GET",
            dataType: "html",
            statusCode: {
                404: function() {
                    document.getElementById("htmlSource").innerHTML =
                        "404 page not found";
                }
            },
            success: GenPage, 
            error: Failure
        });
    });
});

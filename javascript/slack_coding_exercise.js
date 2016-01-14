$.fn.TagName = function() {
    if (this.prop("tagName") === undefined)
        return undefined;
    return this.prop("tagName").toLowerCase();
};

function CountTag(dom, tagDictionary) {
    if (dom.childNodes.length !== 0) {
        for (var i = 0; i < dom.childNodes.length; i++) {
            CountTag(dom.childNodes[i], tagDictionary);
        }
    }
    var tag = $(dom).TagName();
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
        var li = $("<li></li>");
        var ele = $("<span class='tag' role='button' id='" + tag + "'></span>");
        $(ele).text("<" + tag + ">");
        $(li).append(ele);
        $(li).append(": " + tagDic[tag]);
        $(ul).append(li);
    }
    $("#tagSummary").append(ul);
}

function GenPage(data) {
    console.log("Success");
    var dataTransform = data.replace(/&/gm, "&amp;").replace(/</gm, "&lt;")
                            .replace(/>/gm, "&gt;").replace(/"/gm, "&quot;")
                            .replace(/'/gm, "&#x27;");
    var str = "<h2>HTML Document</h2><pre id='code'>" + dataTransform + "</pre>";
    $("#htmlSource").empty();
    $("#htmlSource").append(str);
    TagSummary(data);
}

function Failure() {
    console.log("Error");
    $("#htmlSource").replaceWith("Cannot load page");
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

    $(document).on("click", ".tag", function() {
        var htmlCode = $("#code").html();
        htmlCode.replace(/<span class='color'>/gm, "").replace(/<\/span>/gm, "");
        var id = this.id;
        var colored = new RegExp(id, 'gm');
        console.log(id);
        htmlCode.replace(colored, "<span class='color'>" + id + "</span>");
        $("#code").empty();
        $("#code").append(htmlCode);
    });
});

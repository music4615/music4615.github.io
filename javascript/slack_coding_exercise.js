// Find the tag name of an element in lowercase
$.fn.TagName = function() {
    if (this.prop("tagName") === undefined)
        return undefined;
    return this.prop("tagName").toLowerCase();
};

// Count every tag in an HTML document
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

// Summarize the tags; print each tag and the number of the tag
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

// Generate the page containing the HTML source and the tag summary
function GenPage(data) {
    var dataTransform = data.replace(/&/gm, "&amp;").replace(/</gm, "&lt;")
                            .replace(/>/gm, "&gt;").replace(/"/gm, "&quot;")
                            .replace(/'/gm, "&#x27;");
    var str = "<h2>HTML Document</h2><pre id='code'>" + dataTransform + "</pre>";
    $("#htmlSource").empty();
    $("#htmlSource").append(str);
    TagSummary(data);
}

// Show a message when the page is not able to be fetched
function Failure() {
    console.log("Error");
    $("#htmlSource").replaceWith("Cannot load page");
}

// When there is a click event, print the results using the above functions
$(function () {
    $("#submit").on('click', function() {
        $.ajax({
            url: document.getElementById("url").value,
            method: "GET",
            dataType: "html",
            statusCode: {
                404: function() {
                    $("#htmlSource").text("404 page not found");
                }
            },
            success: GenPage, 
            error: Failure
        });
    });

    $(document).on("click", ".tag", function() {
        var htmlCode = $("#code").html();
        htmlCode = htmlCode.replace(/<span class="color">/gm, '').replace(/<\/span>/gm, '');
        var id = this.id;
        var colored = new RegExp("^(.*)(\&lt;" + id + ".*\&gt;)", 'gm');
        htmlCode = htmlCode.replace(colored, "$1<span class='color'>$2</span>");
        $("#code").empty();
        $("#code").append(htmlCode);
    });
});

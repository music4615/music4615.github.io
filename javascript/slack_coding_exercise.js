function TagSummary(htmlText) {
    document.getElementById("tagSummary").innerHTML = "<h2>HTML Tags Summary</h2>";
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(htmlText, "text/html");
    console.log(htmlDoc.firstChild);
}

function GenPage(data) {
    console.log("Success");
    var dataTransform = data.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
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

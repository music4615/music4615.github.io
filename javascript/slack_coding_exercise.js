function TagSummary (data) {
    var tags = data.getElementByTagName("*");
    for (var i = 0; i < 1; i++) {
        console.log(tags[i]);
    }
    document.getElementById("tagSummary").innerHTML = "Summary";
}

function GenPage(data) {
    console.log("Success");
    document.getElementById("htmlSource").innerHTML = ("<xmp>" + data + "</xmp>");
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
                    document.getElementById("htmlSource").innerHTML = "404 page not found";
                }
            },
            success: GenPage, 
            error: Failure
        });
    });
});

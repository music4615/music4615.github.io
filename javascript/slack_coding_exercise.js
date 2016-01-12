function TagSummary(data) {
    document.getElementById("tagSummary").innerHTML = "<h2>HTML Tags Summary</h2>";
}

function GenPage(data) {
    console.log("Success");
    document.getElementById("htmlSource").innerHTML = ("<h2>HTML Document</h2><xmp>" + data + "</xmp>");
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

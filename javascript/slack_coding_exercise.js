// function loadHtml(url) {
//     var xhttp;
//     if (window.XMLHttpRequest) {
//         xhttp = new XMLHttpRequest();
//     } else {
//         xhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xhttp.open("GET", url, true);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if ((xhttp.readyState == 4) && (xhttp.status == 200)) {
//             document.getElementById("htmlSource").innerHTML = xhttp.responseText;
//         } else if (xhttp.status == 404) {
//             document.getElementById("htmlSource").innerHTML = "Page not found";
//         }
//     }
// }

// $(document).ready(function() {
//     $("#htmlSource").click(function() {
//         $.ajax({
//             url: document.getElementById("url").value,
//             method: "GET",
//             dataType: "html",
//             processData: true,
//             statusCode: {
//                 404: function() {
//                     document.getElementById("htmlSource").innerHTML = "Page not found";
//                 }
//             },
//             success: function(data) {
//                 document.getElementById("submit").innerHTML = data;
//             }
//         });
//     });
// });

function LoadHtml() {
    var url = document.getElementById("url").value;
    var xhttp = new XMLHttpRequest();
    xhttp.dataType = "html";
    xhttp.onload = GenPage;
    xhttp.onerror = Failure;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function GenPage() {
    document.getElementById("htmlSource").innerHTML = this.responseText;
}

function Failure() {
    document.getElementById("htmlSource").innerHTML = "Cannot load page";
}

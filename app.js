'use strict'

function getLinks() {
    var searchTerm = $("input#searchTermInput").val();
    var numberOfLinks = $("input#numberofLinksInput").val();
    $("#linksList").empty();
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&titles=" + searchTerm + "&pllimit=" + numberOfLinks + "&pldir=ascending&prop=links&format=json",
        method: "GET",
        dataType: "jsonp" //allow CORS
    }).then(function (data) {
        var plcontinueArray = data.continue.plcontinue.split("|")
        var pageId = plcontinueArray[0];
        
        var links = data.query.pages[pageId].links;
        console.log(links);
        console.log(pageId);
        
        links.forEach(function(element) {
            $("#linksList").append("<li class='list-group-item animated zoomIn'>" + element.title + "</li>");
        }, this);
        
    });
};

$(document).ready(function() {
    $("input#searchTermInput").on('keyup', function (e) {
        if (e.keyCode == 13) { //when pressing the enter key
            getLinks();
        }
    });
    $("input#numberofLinksInput").on('keyup', function (e) {
        if (e.keyCode == 13) { //when pressing the enter key
            getLinks();
        }
    });
});

var index_tours_array
/*
* @function getDatafromDB - retrieve all tours from mongoDB tour-Collection
*/
function getIndexTourDatafromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search_tour/", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        //async: false
        })
        .done(function(res) { //if the request is done -> successful
            index_tours_array = res //store tours in tours_array
            fillIndexSelectTour();
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails
            console.log("Request has failed!", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
    }
} 
function fillIndexSelectTour() {
    for (var i=0; i<tours_array.length; i++) {
        var z = document.createElement("option");
        z.setAttribute("value", JSON.parse(tours_array[i].json).tourName) //
        var t = document.createTextNode(JSON.parse(tours_array[i].json).tourName)
        z.appendChild(t);
        document.getElementById("indexSelect").appendChild(z);
    }
}
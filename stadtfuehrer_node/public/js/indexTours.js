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
            console.log(index_tours_array)
            fillIndexSelectTour();
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails
            console.log("Request has failed!", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
    }
} 
function fillIndexSelectTour() {
    for (var i=0; i<index_tours_array.length; i++) {
        var z = document.createElement("option");
        
        z.setAttribute("value", index_tours_array[i]._id.toString()) //
        var t = document.createTextNode(index_tours_array[i].tourname)
        z.appendChild(t);
        document.getElementById("indexSelect").appendChild(z);
    }
}

function fillMap() {
    let usedRoute=document.getElementById("indexSelect").value;
    console.log(usedRoute);
    for(i=0;i<index_tours_array.length;i++){
        if(usedRoute==index_tours_array[i]._id.toString()){
            visualizeTour(index_tours_array[i].items);
        }
    }
}
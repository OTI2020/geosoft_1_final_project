
var tours_array
/*
* @function getDatafromDB - retrieve all tours from mongoDB tour-Collection
*/
function getTourDatafromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search_tour/getCollection", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        async: false
        })
        .done(function(res) { //if the request is done -> successful
            tours_array = res //store tours in tours_array
            console.log("stored "+tours_array.length+" tours in tours_array!!!");
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed!", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed (Tour Data)"); //a short message is logged
        })
    }
}   
getTourDatafromDB()

console.log(JSON.parse(tours_array[0].json).tourName)


function fillSelectTour() {
    // var tour_value = document.getElementById("selectTour").value; //get value
    for (var i=0; i<tours_array.length; i++) {
        var z = document.createElement("option");
        z.setAttribute("value", JSON.parse(tours_array[i].json).tourName) //
        var t = document.createTextNode(JSON.parse(tours_array[i].json).tourName)
        z.appendChild(t);
        document.getElementById("selectTour").appendChild(z);
    }

}
fillSelectTour()




/**
 * @function selectTourForDelete - function adds a tour to be deleted to the the deleteTour form
 */
 function selectTourForDelete() {
     console.log("tours_array test_2");
     console.log(tours_array.length);


    var value = document.getElementById("selectTourToDelete").value; //get value from toggler
    for(var i = 0; i < tours_array.length; i++) { //iterate over forms 
        if(tours_array[i].tourName == value) { //if criteria are met
            document.getElementById('TourNameToDelete').value = tours_array[i].tourName; //add tourID to form
        }
    }
}
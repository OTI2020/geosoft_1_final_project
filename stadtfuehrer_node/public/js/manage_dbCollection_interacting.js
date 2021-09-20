
var tours_array
/*
* @function getDatafromDB - retrieve all tours from mongoDB tour-Collection
*/
function getTourDatafromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search_tour/", //request url is the prebuild request
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

// console.log(JSON.parse(tours_array[0].json).tourName)

/**
 * @function fillSelectTour
 */
function fillSelectTour() {
    for (var i=0; i<tours_array.length; i++) {
        var z = document.createElement("option");
        z.setAttribute("value", tours_array[i].tourname);
        var t = document.createTextNode(tours_array[i].tourname);
        z.appendChild(t);
        document.getElementById("selectTour").appendChild(z);
    }

}
fillSelectTour()




/**
 * triggerd onclick - see tours_config.html
 * @function selectTourForDelete - function adds a tour to be deleted to the the deleteTour form
 */
function selectTourForDelete() {
    console.log("selectTour onchange -> Tour to delete");
    var value = document.getElementById("selectTour").value; //get value from toggler
    // console.log(document.getElementById("selectTour").value)
    let i = 0
    while (i < tours_array.length) { //iterate over forms 
        if(JSON.parse(tours_array[i].json).tourName == value) { //if criteria are met
            document.getElementById('TourNameToDelete').value = JSON.parse(tours_array[i].json).tourName //add tourID to form
            // console.log(document.getElementById('TourNameToDelete').value) //add tourID to form
            i=tours_array.length
        } else {
            i++ 
            console.log("iteration");
            }
    }
}


///////////////////////////////////////////////////////////////
// following is similar, but for pois

var pois_array
/*
* @function getDatafromDB - retrieve all pois from mongoDB tour-Collection
*/
function getPoisDatafromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search/", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        async: false
        })
        .done(function(res) { //if the request is done -> successful
            pois_array = res //store tours in tours_array
            console.log("stored "+pois_array.length+" pois in pois_array!!!");
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed!", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed (Tour Data)"); //a short message is logged
        })
    }
}   
getPoisDatafromDB()
// console.log(pois_array[0].poiname)



/**
 * same procedure like @function fillSelectTour() but for pois
 * @param {*} input_array 
 * @param {*} selectionID 
 */
function fillSelectPoisforUpdate(input_array, selectionID) {
    for (var i=0; i<input_array.length; i++) {
        var a = document.createElement("option");
        a.setAttribute("value", input_array[i].poiname) //
        var b = document.createTextNode(input_array[i].poiname)
        a.appendChild(b);
        document.getElementById(selectionID).appendChild(a);
    }

}
fillSelectPoisforUpdate(pois_array, "selectPoisToDeleteFromTour")
fillSelectPoisforUpdate(pois_array, "selectPoisToAddToTour")




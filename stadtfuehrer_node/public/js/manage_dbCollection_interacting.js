
var pois_array
var tours_array
/*
* @function getAllfromDB - retrieve all data (locations and tours) from mongoDB
*/
function getAllfromDB() { 
   {$.ajax({ //handle request via ajax
       url: "/search/getCollections", //request url is the prebuild request
       method: "GET", //method is GET since we want to get data not post or update it
       async: false
       })
       .done(function(res) { //if the request is done -> successful
           pois_array = res[0]; //store locations in locations array
           tours_array = res[1]; //store tours in tours_array
       },
    }
}
getAllfromDB();





/**
 * @function selectTourForDelete - function adds a tour to be deleted to the the deleteTour form
 */
 function selectTourForDelete() {
    var value = document.getElementById("selectTourToDelete").value; //get value from toggler
    for(var i = 0; i < tours_array.length; i++) { //iterate over forms 
        if(tours_array[i].tourName == value) { //if criteria are met
            document.getElementById('TourNameToDelete').value = tours_array[i].tourName; //add tourID to form
        }
    }
}


/*
 * function to get the names of the pois as a request
 *
 */
function getPoiNamesfromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        })
        .done(function(res) {
            console.dir(res)
            var currName=[];
            for(let i = 0; i < res.length; i++) {
                currName.push(res[i].poiname);
                //let resGeoJSON = JSON.stringify(currName);
                //JSON.parse(resGeoJSON);
            }
            searchThrough(currName);
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed!", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
        })
        .always(function(xhr, status) { //if the request is "closed", either successful or not 
            console.log("Request completed"); //a short message is logged
        })
    }
}

/*
 * function for searching through the poi names and to compare it with the input for autocomplete
 */
function searchThrough(currName){
    //retrieve the JSON objects
    //let poisOnMap = currName;
    //test
    console.log("Dies ist eine Testzeile" + poiNames)
    
    //retrieve POI names
    let poiNames = currName;
    //console.log(poiNames)
    
    //use autocomplete
    $("poisOnMap").autocomplete({
        //Specify start by number of characters
        minLength: 1,
        //Specify the data source for autocomplete
        source: poiNames, //Hier anpassen Get Request
        select: function(event, ui){
            this.value = ui.item.value
            let details = poisOnMap.filter(function (el){
                return currName === ui.item.value
            })
            return false
        }
    })
}
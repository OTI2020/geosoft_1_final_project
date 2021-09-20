/**
 * Creates a checkbox List with all pois from the db as a checkbox
 */
function createCheckList() {
    console.log("test")
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        async:false,
        })
        .done(function(res) { // if request successful
            // create main div-container
            var div=document.getElementById("checkDiv");
            let count=0;
            // create html for each poi in collection
            for(let i = 0; i < res.length; i++) {
               
                let json=res[i].json
                let poiName=res[i].poiname;

                // create sub-div
                var formrow=document.createElement("div");
                formrow.className="form-check";

                // create check box
                var x = document.createElement("INPUT");
                x.setAttribute("type", "checkbox");
                x.name="check"+i;
                x.value=json;
                x.className="form-check-input"

                // create label for check box
                var y = document.createElement("LABEL");
                y.htmlFor="check"+i;
                y.name="checkName"+i;
                y.innerHTML=poiName; 
                y.className="form-check-label"

                // create hidden input for later date transmission
                var nameSave = document.createElement("INPUT");
                nameSave.setAttribute("type", "hidden");
                nameSave.name="nameSave"+i;
                nameSave.value=poiName;

                // add all elements to sub and main div
                formrow.appendChild(x);  
                formrow.appendChild(y);  
                formrow.appendChild(nameSave);   
                div.appendChild(formrow);  
                count++;  
            }
            // insert count for later use
            document.getElementById("tour-count").value=count;
        })
        .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
            console.log("Request has failed!", '/n', "Status: " + status, '/n', "Error: " + errorThrown);
        })}
}
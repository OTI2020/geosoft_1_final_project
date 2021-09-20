let allPoisArray;
function createCheckList() {
    console.log("test")
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        async:false,
        })
        .done(function(res) {
            console.dir(res)
            allPoisArray=res;
            var div=document.getElementById("checkDiv");
            let count=0;
            for(let i = 0; i < res.length; i++) {
               
                let json=res[i].json
                let poiName=res[i].poiname;
                //let resGeoJSON = JSON.parse(json); 
                var formrow=document.createElement("div");
                formrow.className="form-check";
                var x = document.createElement("INPUT");
                x.setAttribute("type", "checkbox");
                x.name="check"+i;
                x.value=json;
                x.className="form-check-input"
                var y = document.createElement("LABEL");
                y.htmlFor="check"+i;
                y.name="checkName"+i;
                y.innerHTML=poiName; 
                y.className="form-check-label"
                var nameSave = document.createElement("INPUT");
                nameSave.setAttribute("type", "hidden");
                nameSave.name="nameSave"+i;
                nameSave.value=poiName;
                formrow.appendChild(x);  
                formrow.appendChild(y);  
                formrow.appendChild(nameSave);   
                div.appendChild(formrow);  
                count++;  
            }
            document.getElementById("tour-count").value=count;

        })
    }
}
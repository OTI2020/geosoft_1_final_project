function fillPopupHTML(name, url, json, exist, layer){
    return getWikipediaData(name,url,json,exist, layer);
}
  
function getDatafromDB() { 
   {$.ajax({ //handle request via ajax
       url: "/search", //request url is the prebuild request
       method: "GET", //method is GET since we want to get data not post or update it
       })
       .done(function(res) {
           console.dir(res)
           for(let i = 0; i < res.length; i++) {
               let json=res[i].json
               let resGeoJSON = JSON.parse(json);
               var  layer = L.geoJSON(resGeoJSON);
               fillPopupHTML(res[i].poiname, res[i].link, json, 1,layer)
           }
       })
       .fail(function(xhr, status, errorThrown) { //if the request fails (for some reason)
           console.log("Request has failed!", '/n', "Status: " + status, '/n', "Error: " + errorThrown); //we log a message on the console
       })
       .always(function(xhr, status) { //if the request is "closed", either successful or not 
           console.log("Request completed"); //a short message is logged
       })
   }
} 
function generateHTML(name,url,json,exist,description,layer){
   console.log("html generated");
   let Lname=name;
   let Lurl=url;
   let Ljson=json;
   let pathstr;
   let btntxt;
   let describehtml;
   let describetxt;
   let delbtn;
   if(exist==0){
       pathstr="/add/newpoi";
       btntxt="Speichern";
       describehtml="";
       delbtn="";
   }else if(exist==1){
       pathstr="/update/poi";
       btntxt="Aktualisieren";
       describetxt=description;
       describehtml="<div class='form-group odd'><label>Beschreibung:&nbsp;</label><label name='pdescribe'>"+describetxt+"</label></div>"
       delbtn="&nbsp;&nbsp;<button class='btn btn-danger' type='submit' name='action' value='delete'>Löschen</button>";
   }

   let htmlString="<form action='"+pathstr+"' method='post' class='form-horizontal' role='form'>"+
       "<fieldset>"+
           "<div class='form-group odd'>"+
               "<label class='form-label'>Name:&nbsp;</label>"+
               "<input type='text' class='form-input' name='pname' value='"+Lname+"'/>"+
           "</div>"+
           "<div class='form-group even'>"+
               "<label>URL (Wikipedia):&nbsp;</label>"+
               "<input type='text' name='purl' value='"+Lurl+"'/>"+
           "</div>"+
           describehtml+
           "<div class='form-group even'>"+
               "<input type='hidden' name='pjson' readonly='readonly' value='"+Ljson+"'/>"+
           "</div>"+
       "</fieldset>"+
       "<button class='btn btn-primary' type='submit' name='action' value='update'>"+btntxt+"</button>"+delbtn+
   "</form>";
   if(exist==0){
       drawnItems.addLayer(layer);
       drawnItems.bindPopup(htmlString).openPopup();
   }else{
       markerLayer.addLayer(layer);
       layer.bindPopup(htmlString);
   }
}


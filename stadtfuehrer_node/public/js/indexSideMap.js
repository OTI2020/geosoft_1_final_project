'use strict'
/**
 * Basemap for Leaflet Application
 * @type Leaflet Map
 */
    let mymap = L.map('mapid').setView([51.965, 7.63],13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    

/**
 * Layer for later addition of markers
 * @type Leaflet Layer
 */
    let markerLayer = new L.layerGroup().addTo(mymap);
getIndexDatafromDB();

function fillIndexPopupHTML(name, url, json, layer){
  return getIndexWikipediaData(name,url,json, layer);
}

function getIndexDatafromDB() { 
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
             fillIndexPopupHTML(res[i].poiname, res[i].link, json,layer)
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
function generateIndexHTML(name,url,json,description,layer){
  let Lname=name;
  let Lurl=url;
  let Ljson=json;
  let describehtml;
  describehtml="<div class='form-group odd'><label>Beschreibung:&nbsp;</label><label name='pdescribe'>"+description+"</label></div>"

  let htmlString="<form class='form-horizontal' role='form'>"+
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
          "<div class='form-group'>"+
              "<input type='hidden' name='pjson' readonly='readonly' value='"+Ljson+"'/>"+
          "</div>"+
      "</fieldset>"+
  "</form><button id='weatherStart' onclick='weathercalc('"+Ljson+"')' class='btn btn-secondary'>Nächste Bushaltestelle</button>";
    markerLayer.addLayer(layer);
    layer.bindPopup(htmlString);
  
}
let maxindexSnippetLength=250;
function getIndexWikipediaData(name,url,json,layer){
        let urlexists=checkURL(url);
        if(urlexists==true){
            let decodedURL = decodeURI(url);
            let urlslashsplit=decodedURL.split("/");
            let urldotsplit=urlslashsplit[2].split(".")
            let lang=urldotsplit[0];
            let title=urlslashsplit[4];
            try{
                $.getJSON("https://"+lang+".wikipedia.org/w/api.php?action=query&titles="+title+"&prop=extracts&exintro&explaintext&format=json&indexpageids&callback=?", function (data) {
                var pageid=data.query.pageids[0];
                var infotext=(data.query.pages[pageid].extract).substring(0,maxSnippetLength)
                var formatInfotext=infotext.replaceAt(maxindexSnippetLength,"&#8230;")
                console.log("Wikipedia API request successful")
                generateIndexHTML(name,url,json,formatInfotext,layer)
                });
            }catch(error){
                return generateIndexHTML(name,url,json,"Keine Informationen verfügbar.",layer)
            }
        }else {
            return generateIndexHTML(name,url,json,"Keine Informationen verfügbar.", layer)
        }
}
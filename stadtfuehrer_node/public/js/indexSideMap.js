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

/**
 * Layer for later addition of markers
 * @type Leaflet Layer
 */
 let stoppsLayer = new L.layerGroup().addTo(mymap);
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
  "</form><button onclick='showInformation("+Ljson+")' class='btn btn-secondary'>Nächste Haltestelle</button>";
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

function generateStopMarker(weatherJSON,name,distance,lat,lng){
    stoppsLayer.clearLayers();
    const myCustomColour = '#1c781f'

    const markerHtmlStyles = `
    background-color: ${myCustomColour};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #E5E500`

    const icon = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`
    })
    
    let localtime = convertTimes(weatherJSON.current.dt);
    let temprature = Math.round(weatherJSON.current.temp);
    let localWeatherSub = weatherJSON.current.weather[0].description;
    let weathericon = getIconUrl(weatherJSON.current.weather[0].icon);
    let stopHtml="<p><b>"+name+"</b></br>Distanz: "+distance+" Meter</br>Wetter ("+localtime+" Uhr): "+localWeatherSub+"</br><img src="+weathericon+"></br>Temperatur: "+temprature+"</p>";
    L.marker([lat, lng], {icon: icon}).addTo(stoppsLayer).bindPopup(stopHtml).openPopup();;
  }
  /**
 * takes id from icon in weather JSON file and chooses fitting URL
 * @param {*} id string
 * @returns 
 */
function getIconUrl(id){
    switch (id){
        case "01d": return "http://openweathermap.org/img/wn/01d@2x.png";
        case "02d": return "http://openweathermap.org/img/wn/02d@2x.png";
        case "03d": return "http://openweathermap.org/img/wn/03d@2x.png";
        case "04d": return "http://openweathermap.org/img/wn/04d@2x.png";
        case "09d": return "http://openweathermap.org/img/wn/09d@2x.png";
        case "10d": return "http://openweathermap.org/img/wn/10d@2x.png";
        case "11d": return "http://openweathermap.org/img/wn/11d@2x.png";
        case "13d": return "http://openweathermap.org/img/wn/13d@2x.png";
        case "50d": return "http://openweathermap.org/img/wn/50d@2x.png";
        case "01n": return "http://openweathermap.org/img/wn/01n@2x.png";
        case "02n": return "http://openweathermap.org/img/wn/02n@2x.png";
        case "03n": return "http://openweathermap.org/img/wn/03n@2x.png";
        case "04n": return "http://openweathermap.org/img/wn/04n@2x.png";
        case "09n": return "http://openweathermap.org/img/wn/09n@2x.png";
        case "10n": return "http://openweathermap.org/img/wn/10n@2x.png";
        case "11n": return "http://openweathermap.org/img/wn/11n@2x.png";
        case "13n": return "http://openweathermap.org/img/wn/13n@2x.png";
        case "50n": return "http://openweathermap.org/img/wn/50n@2x.png";
        default:return "";
    }
}
/**
 * Takes a unix timestemp to convert it to normal time format
 * @param {*} unixTime unix timestemp
 * @returns human readable time format
 */
 function convertTimes(unixTime){
    let unix = unixTime;
    let unixMilli = unix * 1000;
    let dateObject = new Date(unixMilli);
    return dateObject.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});
}
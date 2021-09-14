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
getDatafromDB();
/**
 * Layer on which the User can draw a shape
 * @type Leaflet Layer
 */
    let drawnItems = L.featureGroup().addTo(mymap);

// Adding a Leaflet.Draw Toolbar
    mymap.addControl(new L.Control.Draw( {
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            // Only rectangle draw function is needed
            polyline: false,
            polygon: true,
            point: true,
            circle:false,
            rectangle: false
        }
    }))

// Listener to catch when a shape is drawn onto the map
    mymap.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);
        let geoJSONObj=layer.toGeoJSON();
        let geoJSONStr=JSON.stringify(geoJSONObj)
        console.log(geoJSONStr);
        let form_popup = fillPopupHTML("","",geoJSONStr)
            drawnItems.bindPopup(form_popup).openPopup();
    })

// Listener to catch when a shape is deleted from the map
    mymap.on('draw:deleted', function(e){
        var layers = e.layers;
        layers.eachLayer(function (layer) {
            markerLayer.clearLayers(); // Clearing old markers
        });
    })


/**
 * The method starts a ajax request to get data from OpenWeatherMap at a given location and appends the result to a given marker as a String popup
 * @param {*} coordinateArray Coordinates of a single point
 * @param {*} marker Leaflet marker object
 */
function getWeatherData(coordinateArray, marker){
    let lat= coordinateArray[0];
    let lng= coordinateArray[1];
    //let tempText="";
    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely,hourly,daily&appid=" + weatherApi+"&units=metric"
    $.ajax({
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(result){
            console.log(result.current.temp);
            let weather = "<b>current Weather:</b><br>" +result.current.weather[0].description + "<br>" + result.current.temp + "°C";
            console.log(weather);
            marker.bindPopup(weather).openPopup();
        }
    }).done(function() {
        $( this ).addClass( "done" );
      });
}
//let response;
function getDatafromDB() { 
    {$.ajax({ //handle request via ajax
        url: "/search", //request url is the prebuild request
        method: "GET", //method is GET since we want to get data not post or update it
        })
        .done(function(res) { //if the request is done -> successful
            //bind a popupto the given marker / the popupt is formatted in HTML and 
            //is enriched with information extracted from the api response
            //console.log(response[0].geojson.features[0]);
            //response = res;
            console.dir(res)
            for(let i = 0; i < res.length; i++) {
                let json=res[i].json
                let resGeoJSON = JSON.parse(json);
                var  layer = L.geoJSON(resGeoJSON);
                markerLayer.addLayer(layer);
                layer.bindPopup(fillPopupHTML(res[i].poiname, res[i].link, json));
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

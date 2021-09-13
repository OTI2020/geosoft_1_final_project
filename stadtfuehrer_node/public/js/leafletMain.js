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
        let coords=layer.getLatLng();
        console.log(coords);
        let form_popup = "<form action='/add/newpoi' method='post' class='form-horizontal' role='form'>"+
            "<fieldset>"+
                "<div class='form-group odd'>"+
                    "<label class='form-label'>Name:&nbsp;</label>"+
                    "<input type='text' class='form-input' name='pname'/>"+
                "</div>"+
                "<div class='form-group even'>"+
                    "<label>URL (Wikipedia):&nbsp;</label>"+
                    "<input type='text' name='purl'/>"+
                "</div>"+
                "<div class='form-group odd'>"+
                    "<label>Beschreibung:&nbsp;</label>"+
                    "<label name='pdescribe' placeholder='keine Information verfügbar'></label>"+
                "</div>"+
                "<div class='form-group odd'>"+
                    "<label>Koordinaten:&nbsp;</label>"+
                    "<input type='text' name='pcoords' readonly='readonly'value='"+coords+"'/>"+
                "</div>"+
            "</fieldset>"+
            "<button class='btn pupBtn' type='submit'>Speichern</button>"+
            "</form>";
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
function sendData(){
    
    console.log("Data send");
}
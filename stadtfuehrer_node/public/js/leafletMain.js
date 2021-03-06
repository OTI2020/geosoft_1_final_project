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

    // call getDatafromDB() to load existing pois at page load
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
            // Only rectangle and point draw function is needed
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
        let geoJSONObj=layer.toGeoJSON();
        let geoJSONStr=JSON.stringify(geoJSONObj)
        fillPopupHTML("","",geoJSONStr, 0,layer);
    })

// Listener to catch when a shape is deleted from the map
    mymap.on('draw:deleted', function(e){
        var layers = e.layers;
        layers.eachLayer(function (layer) {
            drawnItems.clearLayers(); // Clearing old markers
        });
    })
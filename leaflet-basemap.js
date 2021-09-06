var map = L.map('map'
                //,{minZoom: 10}
               ).setView([51.975, 7.61], 13);




// add an OpenStreetMap tile layer
var osm = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




// add the humanitarian OpenStreetMap layer
var hotOSM = new L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team'
}).addTo(map);



/*
// add a marker in the given location, attach some popup content to it and open the popup
var ifgi_marker = L.marker([51.969279, 7.595796]).addTo(map);
ifgi_marker.bindPopup('ifgi');
ifgi_marker.openPopup();
*/


/*
// add circle to 
var ms_city_circle = new L.circle([51.961693, 7.627931], 250, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);

ms_city_circle.bindPopup("Münster Innenstadt. <br/><img src='https://www.uni-muenster.de/imperia/md/images/zentral/international/bildergalerie/prinzipalmarkt_panorama_1200px.jpg'/ width='300px'>");
ms_city_circle.openPopup();
*/


/*
var church_Ueberwasserkirche_GeojsonFeature = {
    "type": "Feature",
        "properties": {
          "name": "Ueberwasserkirche",
          "URL": "https://en.wikipedia.org/wiki/%C3%9Cberwasserkirche",
          "description": "schoene Kirche"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                7.622365951538085,
                51.964266412705875
              ],
              [
                7.622333765029907,
                51.96399537718307
              ],
              [
                7.6233744621276855,
                51.964028430383344
              ],
              [
                7.623385190963744,
                51.96420030663192
              ],
              [
                7.623267173767089,
                51.96431268689964
              ],
              [
                7.62248396873474,
                51.964266412705875
              ],
              [
                7.622365951538085,
                51.964266412705875
              ]
            ]
        ]
    }
}

var overlay = L.geoJson(church_Ueberwasserkirche_GeojsonFeature);
overlay.bindPopup(church_Ueberwasserkirche_GeojsonFeature.properties.name);
*/



//add layer switcher
var baseMaps = {
    "OSM": osm,
    "humanitarian OSM": hotOSM
};
/*
var overlayMaps = {
    "nice_church": overlay
};*/

L.control.layers(baseMaps).addTo(map);
//L.control.layers(baseMaps, overlayMaps).addTo(map);




//Feature Group Layers for the Input Features
var location_layer = L.featureGroup().addTo(map);

//draw Features
var drawControl = new L.Control.Draw({
    draw: {
        //disable all draw functions but Points and Polygons
        polyline: false, 
        polygon: true,
        circle: false,
        circlemarker: false,
        marker: true,
        rectangle: false
    },
    edit: {
        //drawn features will be stored in the locationLayer
        featureGroup: location_layer,
        remove: false,
        edit: false
    }
}); 
map.addControl(drawControl); //add the control to the map
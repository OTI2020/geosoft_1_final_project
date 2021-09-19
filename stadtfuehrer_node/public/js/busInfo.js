var x = document.getElementById("informationDisplay"); //making a shorter reference with x
var y = document.getElementById("informationControlDisplay"); //""
const weatherApi = ""; //insert here your Api-Key as a constant
var reqTerm = ""; //placeholder for the later compound expression (Api Request)
var lat = 0; //{float} stores the determined coordinates (latitude)
var lng = 0; //{float} stores the determined coordinates (longitude)
let jsonHaltestellen;
var geocoder;
let cityJSON;
var xTest;
var coords;



/**
* This function displays the location of the browser
* (for testing this function also uses the "insertLatLngApi" function for checking the composition of the api request adress
*/
function showInformation() {
	startApiReqBusStop();
}

/**
* This function starts a request of all bus stops in muenster and stores it in an array.
*/
	function startApiReqBusStop() {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "https://rest.busradar.conterra.de/prod/haltestellen");
		xhr.onload=function(){
			if(xhr.status===200){
			jsonHaltestellen=JSON.parse(xhr.responseText);
				let arr = Object.entries(jsonHaltestellen);
				let arr2 = arr[1];
				let arr3 = arr2[1]; //Enthaelt jetzt nur noch 1119 Arrays mit den verschiedenen properties
				
				console.log(jsonHaltestellen); //Testzwecke
				
				printingArea.innerHTML = JSON.stringify(arr3[0]);
				//console.log(arr3);
				var allBusStops = arr3[0];
				var coords= allBusStops.geometry.coordinates[0];
				console.log(coords); //Testzwecke
				
				testingArea.innerHTML = JSON.stringify(coords);
				
				//Hilfvariable h, um Entfernungen zu speichern und zu Sortierne
				let h = [];
				//Hilfvariable k, um Entfernungen zu speichern (in ursprünglicher Anordnung) um nachher die Bushaltestelle wiederzufinden
				let k = [];
				/*
				* Iteriert durch alle Bushaltestellen und speichert die Entfernung aller Bushaltestellen zur Sehenswürdigkeit 
				*
				* To-Do: Ergänzung eines weiteren gespeicherten Werts zum Identifizieren der Bushaltestelle (2D Array?)
				*/
				for(i=0; i< arr3.length; i ++) {
					
					var xAxes = arr3[i].geometry.coordinates[1];
					var yAxes = arr3[i].geometry.coordinates[0];

					
					var from = turf.point([51.953029, 7.614783]);
					var to = turf.point([xAxes, yAxes]);
					var options = {units: 'kilometers'};
					var distance = turf.distance(from, to, options);
					h[i] = distance;
					k[i] = distance;
					var entfernung = distance.toFixed(3);
					//console.log(entfernung);
					
					/*if(distance < vgl){
						vgl = distance;
					}*/
				} 
				h.sort(function(a, b){return a - b});
				//console.log(h);
				var nearest = h[0];
				var indexOfNearest = k.indexOf(nearest);
				console.log("Index of: " + indexOfNearest); //Testzwecke
				var nextBusStop = arr3[indexOfNearest].properties.lbez;
				lat = arr3[indexOfNearest].geometry.coordinates[1];
				lng = arr3[indexOfNearest].geometry.coordinates[0];
				var nearestInMeters = nearest*1000;
				distanceArea.innerHTML = "Nearest bus stop: " + nextBusStop + " in " + nearestInMeters.toFixed(0) + " meters.";
				startApiReqWeather();
		}
	}
	xhr.send();
}


/**
* This function starts a request
*/
function startApiReqWeather() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely,hourly,daily&appid=" + weatherApi+"&units=metric");
	
	xhr.onload=function(){
		if(xhr.status===200){
			jsonWeather=JSON.parse(xhr.responseText);
			console.log(jsonWeather);
			getCity(lat,lng);
			
		}
	}
	xhr.send();
}

/**
 * starts a xhr request to get the city name for given coordinates, also calls createWeatherWidget
 * @param {*} lat coordiante/ number
 * @param {*} lng coordiante/ number
 */
function getCity(lat, lng){
    const Http = new XMLHttpRequest();
    bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client"+ "?latitude=" + lat+ "&longitude=" + lng+ "&localityLanguage=en";
    getApi(bdcApi);
    function getApi(bdcApi) {
        Http.open("GET", bdcApi);
        Http.send();
        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                cityJSON=JSON.parse(Http.responseText);
				createWeatherWidget(jsonWeather,cityJSON);
            }
        };
    }
}
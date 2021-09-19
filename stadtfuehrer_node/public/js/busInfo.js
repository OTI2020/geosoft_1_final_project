var x = document.getElementById("informationDisplay"); //making a shorter reference with x
var y = document.getElementById("informationControlDisplay"); //""
const weatherApi = "4e15e7789d8b6aeb5a704566f3b07c48"; //insert here your Api-Key as a constant
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
function showInformation(json) {
	startApiReqBusStop(json);
}

/**
* This function starts a request of all bus stops in muenster and stores it in an array.
*/
	function startApiReqBusStop(sightJSONObj) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", "https://rest.busradar.conterra.de/prod/haltestellen");
		xhr.onload=function(){
			if(xhr.status===200){
			jsonHaltestellen=JSON.parse(xhr.responseText);
				let arr = Object.entries(jsonHaltestellen);
				let arr2 = arr[1];
				let arr3 = arr2[1]; //Enthaelt jetzt nur noch 1119 Arrays mit den verschiedenen properties
				
				console.log(jsonHaltestellen); //Testzwecke
				
				//printingArea.innerHTML = JSON.stringify(arr3[0]);
				//console.log(arr3);
				var allBusStops = arr3[0];
				var coords= allBusStops.geometry.coordinates[0];
				console.log(coords); //Testzwecke
				
				//testingArea.innerHTML = JSON.stringify(coords);
				
				//Hilfvariable h, um Entfernungen zu speichern und zu Sortierne
				let h = [];
				//Hilfvariable k, um Entfernungen zu speichern (in ursprünglicher Anordnung) um nachher die Bushaltestelle wiederzufinden
				let k = [];
				/*
				* Iteriert durch alle Bushaltestellen und speichert die Entfernung aller Bushaltestellen zur Sehenswürdigkeit 
				*
				* To-Do: Ergänzung eines weiteren gespeicherten Werts zum Identifizieren der Bushaltestelle (2D Array?)
				*/
				var lonSight;
				var latSight;	
				if(sightJSONObj.type=="Feature"){
					lonSight=sightJSONObj.geometry.coordinates[0];
					latSight=sightJSONObj.geometry.coordinates[1];
				}else if(sightJSONObj.type=="FeatureCollection"){
					lonSight=sightJSONObj.features[0].geometry.coordinates[0];
					latSight=sightJSONObj.features[0].geometry.coordinates[1];
				}else{
					console.log("invalid JSON type");
					return false;
				}
				let shortestDist=10000000000000;
				let bestStoppLat;
				let bestStoppLng;
				let bestStoppName;
				for(i=0; i< arr3.length; i ++) {					
					var currlng = arr3[i].geometry.coordinates[0];
					var currlat = arr3[i].geometry.coordinates[1];
					
					var from = turf.point([latSight, lonSight]);
					var to = turf.point([currlat, currlng]);
					var options = {units: 'kilometers'};
					var currdistance = turf.distance(from, to, options);
					
					if(currdistance<shortestDist){
						shortestDist=currdistance;
						bestStoppLat=currlat;
						bestStoppLng=currlng;
						bestStoppName=arr3[i].properties.lbez;
					}
				} 
				let roundedDistance=Math.floor(shortestDist*1000);
				startApiReqWeather(bestStoppLat,bestStoppLng,bestStoppName,roundedDistance);		
		}
	}
	xhr.send();
}


/**
* This function starts a request
*/
function startApiReqWeather(lat,lng,name,distance) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely,hourly,daily&appid=" + weatherApi+"&units=metric");
	
	xhr.onload=function(){
		if(xhr.status===200){
			jsonWeather=JSON.parse(xhr.responseText);
			console.log(jsonWeather);
			generateStopMarker(jsonWeather,name,distance,lat,lng);
		}
	}
	xhr.send();
}
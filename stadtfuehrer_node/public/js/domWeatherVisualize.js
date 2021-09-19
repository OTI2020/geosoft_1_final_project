// JavaScript Document
// author: Dominik Zubel, Tobias Brand
'use strict'
/**
 * Creates a div container with weather and geographical data
 * @param {*} json JSON Object with weather data
 * @param {*} cJSON JSON Object with geographical data
 */
function createWeatherWidget(json, cJSON){
    // Variables
    let localtime = convertTimes(json.current.dt)
    let temprature = Math.round(json.current.temp);
    let localWeatherSub = json.current.weather[0].description;
    let weatherIcon = json.current.weather[0].icon;
    let windSpeed = json.current.wind_speed;
    let cityName = cJSON.locality;

    // Main Div
    let weatherWidget = document.createElement("div");
    weatherWidget.id = "informationDisplay";
    
    // Sub div
    let linebreak1 = document.createElement("br");
    let linebreak2 = document.createElement("br");
    let linebreak3 = document.createElement("br");

    let dataDiv = document.createElement("div");
    dataDiv.id="dataDiv";
    let timeText = document.createTextNode("Uhrzeit: "+localtime);
    timeText.id = "timeText";
    let tempText = document.createTextNode(temprature+" °C");
    tempText.id = "tempText";
    let windText = document.createTextNode("Wind: "+windSpeed+"km/h");
    windText.id = "windText";
    dataDiv.appendChild(tempText);
    dataDiv.appendChild(linebreak1);
    dataDiv.appendChild(windText);
    dataDiv.appendChild(linebreak2);
    dataDiv.appendChild(timeText);

    // Sub div
    let nameDiv = document.createElement("div");
    nameDiv.id="nameDiv";
    let nameText = document.createTextNode(cityName);
    nameText.id = "cityText";
    nameDiv.appendChild(nameText);

    // Sub div
    let condDiv = document.createElement("div");
    condDiv.id="condDiv";
    let wIcon = document.createElement("IMG");
    wIcon.id = "wIcon";
    wIcon.src= getIconUrl(weatherIcon);
    let subConText = document.createTextNode(localWeatherSub);
    subConText.id = "subConText";
    condDiv.appendChild(wIcon);
    condDiv.appendChild(linebreak3);
    condDiv.appendChild(subConText);

    weatherWidget.appendChild(dataDiv);
    weatherWidget.appendChild(nameDiv);
    weatherWidget.appendChild(condDiv);

    document.body.appendChild(weatherWidget);
    
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
const express = require('express'); //require for express
const MongoClient = require('mongodb').MongoClient 
const assert = require('assert')
const app= express() //create express app
const port = 3000;

const url = 'mongodb://mongo:27017'
const client = new MongoClient(url)
const dbName = 'mainDB'
const collectionName = 'paths'
//Parser for Request
app.use(express.json());
app.use(express.urlencoded());

//Routers
var searchRouter = require('./routes/search.js'); //require search router
var addRouter = require('./routes/add.js'); //require add router
var updateRouter = require('./routes/update.js'); //require update router
var deleteRouter = require('./routes/delete.js'); //requiredelete router

//Usages (mainly routers)
app.use('/search', searchRouter);
app.use('/add', addRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

//Folders
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//Gets
app.get("/weatherData", (req, res) => { res.sendFile(__dirname + "/public/uebung_6_weather.html"); });
app.get("/manageRoutes", (req, res) => { res.sendFile(__dirname + "/public/uebung_6_manage.html"); });
app.get("/home", (req, res) => { res.sendFile(__dirname + "/public/index.html"); });

//Listener
app.listen(port, () => {
	console.log(`Service listening at http://localhost:${port}`);
    }
);
const express = require('express'); //require for express
const MongoClient = require('mongodb').MongoClient 
const assert = require('assert')
const app= express() //create express app
const port = 3000;

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'stadtfuererDB'
const collectionName = 'pois'
//Parser for Request
app.use(express.json());
app.use(express.urlencoded( {extended: true} )); // because Error: 'body-parser deprecated undefined extended'

//Routers
var searchRouter = require('./routes/search.js'); //require search router
var search_tourRouter = require('./routes/search_tour.js'); //require search router
var addRouter = require('./routes/add.js'); //require add router
var add_tourRouter = require('./routes/add_tour.js'); //require add router
var updateRouter = require('./routes/update.js'); //require update router
var deleteRouter = require('./routes/delete.js'); //requiredelete router

//Usages (mainly routers)
app.use('/search', searchRouter);
app.use('/search_tour', search_tourRouter);
app.use('/add', addRouter);
app.use('/add_tour', add_tourRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

//Folders
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//Gets
app.get("/home", (req, res) => { res.sendFile(__dirname + "/public/index.html"); });
app.get("/editPOI", (req, res) => { res.sendFile(__dirname + "/public/sights_config.html"); });


//Listener
app.listen(port, () => {
	console.log(`Service listening at http://localhost:${port}`);
    }
);
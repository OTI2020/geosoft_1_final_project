var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const app = express();

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded( {extended: true} )); // because Error: 'body-parser deprecated undefined extended'

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'stadtfuehrerDB' // database name
const collectionName = 'tours' // collection name
// const gjv = require("geojson-validation");

router.post('/newtour', function(req, res, next) {
  // JSON.stringify(req.body)
  console.log("A new tour has been added")
  let tour = {}
  tour.json = req.body.t_json
  console.log("Test2")

  //catching empty input
  if(tour.json==""){
    console.log("empty JSON");
    res.redirect("/errorData_tour.html");
    return false;
  }
  // connect to the mongodb database and afterwards, insert one the new element
  client.connect(function(err) 
  {
    assert.equal(null, err)
  
    console.log('Connected successfully to server')
  
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // Insert the document in the database
    collection.insertOne(tour, function(err, result) 
    {
      assert.equal(err, null)
      assert.equal(1, result.result.ok)
      // console.log(result)
      console.log(`Inserted ${result.insertedCount} document into the collection`)
      res.redirect('/tours_config.html')
    })
    
  })
});
    
module.exports = router;



////////////////////////////////////////////////////////
// adding tour on tours_config.html


router.post('/newTourManuel', function(req, res, next) {
  console.log("A new tour has been added")
  
  //Create Payload to Store
  var tourName = req.body.tourName;
  var trimmedPois = req.body.poisNames.substring(0, req.body.poisNames.length);
  var pois = trimmedPois.split(',');
  console.log("Test3")

  //catching empty input
  if(tourName.json==""){
    console.log("empty JSON");
    res.redirect("/errorData_tour.html");
    return false;
  }
  // connect to the mongodb database and afterwards, insert one the new element
  client.connect(function(err){
    assert.equal(null, err)
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    
    // Insert the document in the database
    collection.insertOne(tour, function(err, result) {
      assert.equal(err, null)
      assert.equal(1, result.result.ok)
      // console.log(result)
      console.log(`Inserted ${result.insertedCount} document into the collection`)
      res.redirect('/tours_config.html')
    })
  })
});
module.exports = router; //export as router
var express = require('express'); //get express
var router = express.Router(); //use express
const assert = require('assert');

//MongoConnect
//-------------->>>>Hier muss die passende Datenbank und die passende Collection angegeben werden!!!!!<<<<--------------
const url = 'mongodb://localhost:27017' // connection URL
const dbName = 'stadtfuehrerDB' // database name
const toursCollectionName = 'tours' // collection name
//----------------------------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient //Client for MongoDB
const client = new MongoClient(url) // mongodb client

//get Documents
router.get('/searchTour', function(req, res, next) 
{
  //Connect to the mongodb database and retrieve all docs
  client.connect(function(err) 
  {
    assert.strictEqual(null, err);
  
    const db = client.db(dbName); //Database
    const collection = db.collection(toursCollectionName); //Collection

    // Find all documents
    var result = [];
    collection.find({}).toArray(function(err, docs) 
    {
      assert.strictEqual(err, null);
      res.json(docs); //return documents from Database
    })
  })
});
module.exports = router; //export as router



///////////////////////////////////////////////////////////
// get All Tours and their pois

router.get('/getCollection', function(req, res, next) 
{
  
  //Connect to the mongodb database and retrieve all docs
  client.connect(function(err) 
  {
    const db = client.db(dbName); //Database
    const t_collection = db.collection(toursCollectionName); //tours collection
    // Find all documents
    t_collection.find({}).toArray(function(err, docs) 
    {
      res.json(docs); //return documents from Database
      var result = docs
      console.log("> > > result of tour search:");
      // console.log(typeof docs);
      console.log(typeof result[0].json);
    })
  })
});
module.exports = router; //export as router


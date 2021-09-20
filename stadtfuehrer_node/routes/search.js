var express = require('express'); //get express
var router = express.Router(); //use express
const assert = require('assert');

//MongoConnect
//-------------->>>>Hier muss die passende Datenbank und die passende Collection angegeben werden!!!!!<<<<--------------
const url = 'mongodb://localhost:27017' // connection URL
const dbName = 'stadtfuehrerDB' // database name
const poisCollectionName = 'pois' // collection name
const toursCollectionName = 'tours' // collection name
//----------------------------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient //Client for MongoDB
const client = new MongoClient(url) // mongodb client

//get Documents
router.get('/', function(req, res, next) 
{
  //Connect to the mongodb database and retrieve all docs
  client.connect(function(err) 
  {
    assert.strictEqual(null, err);
  
    const db = client.db(dbName); //Database
    const collection = db.collection(collectionName); //Collection

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

router.get('/getCollections', function(req, res, next) 
{
  //Connect to the mongodb database and retrieve all docs
  client.connect(function(err) 
  {
    const db = client.db(dbName); //Database
    const t_collection = db.collection(toursCollectionName); //tours collection
    const p_collection = db.collection(poisCollectionName); //pois collection

    // Find all documents
    var t_result = []; //tour result
    var p_result = []; //location result
    t_collection.find({}).toArray(function(err, docs_1) 
    {
      t_result = docs_1; //store tours

      p_collection.find({}).toArray(function(err, docs_2) 
      {
        p_result = docs_2; //store pois
        var result = [];
        result[0] = p_result;
        result[1] = t_result; 
        res.json(result); //return combines result
      })
    })
  })
});
module.exports = router; //export as router

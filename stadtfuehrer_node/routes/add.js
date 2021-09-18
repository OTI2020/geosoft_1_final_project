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
const collectionName = 'pois' // collection name
const gjv = require("geojson-validation");

router.post('/newpoi', function(req, res, next) 
{
  console.log("A new poi has been added")
  let poi = {}
  poi.poiname = req.body.pname
  poi.json= req.body.pjson
  poi.link = req.body.purl
    // calling validation method from author: https://github.com/mapbox/geojsonhint
    try{
      input=JSON.parse(req.body.pjson)
      console.log(input)
      if(gjv.valid(input)==true){
        console.log("valid geoJSON");
      }else{
        console.log("invalid geoJSON");
        res.redirect("/errorData.html");
        return false;
      }
    }catch(error){
      console.log("invalid geoJSON");
      res.redirect("/errorData.html");
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
      collection.insertOne(poi, function(err, result) 
      {
        assert.equal(err, null)
        assert.equal(1, result.result.ok)
        //console.log(result)
        console.log(`Inserted ${result.insertedCount} document into the collection`)
        res.redirect('/sights_config.html')
      })
      
    })
});

module.exports = router;

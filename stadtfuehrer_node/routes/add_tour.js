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

router.post('/newtour', function(req, res, next) {
  console.log("A new tour will be added");
  let tour = {}
  tour.tourname = req.body.tourname
  tour.items=0;
  let count=req.body.count
  let selPois = [];

  //catching empty input
  if(tour.tourname==""){
    console.log("empty Name");
    res.redirect("/errorData_tour.html");
    return false;
  }
  // checking which pois were selected
  for(let i=0; i<count;i++){
    let checkName="check"+i;
      if(req.body[checkName]){
        let nameSave="nameSave"+i;
        let currName=req.body[nameSave];
        let currJson=req.body[checkName];
        let jsonString={poiname:currName,json:currJson};

        //adding JSON Object to DB Document
        selPois.push(jsonString);
        tour.items=selPois;
      }
  }
  // catching no pois selected
  if (tour.items==0){
    console.log("no Pois selected");
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
      res.redirect('/tours_config.html')
    })
    
  })
});
    
module.exports = router;
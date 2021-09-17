var express = require('express'); //get express
const app = express(); //use express
var router = express.Router(); //get router
const assert = require('assert');

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded( {extended: true} )); // because Error: 'body-parser deprecated undefined extended'

//MongoConnect
//-------------->>>>Hier muss die passende Datenbank und die passende Collection angegeben werden!!!!!<<<<--------------
const url = 'mongodb://localhost:27017' // connection URL
const dbName = 'stadtfuehrerDB' // database name
const collectionName = 'pois' // collection name
//----------------------------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient;
const { json } = require('body-parser');
const client = new MongoClient(url) // mongodb client

//Post Router
router.post('/poi', function(req, res, next)
{
  
  if(req.body.action=="update"){

    //connect to the mongodb database and insert one new element
    client.connect(function(err)
    {
      console.log("connected succesful")
      assert.strictEqual(null, err)
      const db = client.db(dbName) //database
      const collection = db.collection(collectionName) //collection
      collection.find({json: req.body.pjson}).toArray(function(err, docs)
      {

        assert.strictEqual(err, null);
        if(docs.length > 0) {
            //Update the document in the database
            collection.updateOne({json: req.body.pjson}, {$set:{poiname:req.body.pname ,link:req.body.purl}}, function(err, result)
            {
              assert.strictEqual(err, null)
              assert.strictEqual(1, result.result.ok)
            })
            res.redirect('/sights_config.html')
        }
        else {
          res.redirect('/index.html')//redirect after Post
        }
      })
    })
  }else if(req.body.action=="delete"){
    client.connect(function(err)
    {
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        //check if number exists
        collection.find({json: req.body.pjson}).toArray(function(err, docs)
        {
            assert.strictEqual(err, null)

            if(docs.length >0){
                assert.strictEqual(null, err);

                //delete Document
                collection.deleteOne({json: req.body.pjson}, function(err, results){
                    assert.strictEqual(err, null)
                })
                res.redirect('/sights_config.html')
            }
            else {
                res.redirect('/index.html')
            }

        })

    })
  }
});
module.exports = router; //export as router

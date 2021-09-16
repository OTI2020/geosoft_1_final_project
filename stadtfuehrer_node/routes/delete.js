var express = require('express');
const app = express();
var router = express.Router();
const assert = require('assert');

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

//MongoConnect
//-------------->>>>Hier muss die passende Datenbank und die passende Collection angegeben werden!!!!!<<<<--------------
const url = 'mongodb://localhost:27017' // connection URL
const dbName = 'mainDB' // database name
const collectionName = 'pois' // collection name
//----------------------------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(url) // mongodb client

// Delete Router
router.post('/removeEntry', function(req, res, next)
{
    console.log("in remove")
    client.connect(function(err)
    {
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        //check if number exists
        collection.find({json: req.body.pjson}).toArray(function(err, docs)
        {
            console.log(req.body.pjson)
            assert.strictEqual(err, null)

            if(docs.length >= 1){
                console.log(req.body);

                assert.strictEqual(null, err);

                console.log(req.body);
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
})
module.exports = router; //export as router

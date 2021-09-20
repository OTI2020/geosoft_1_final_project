var express = require('express');
const app = express();
var router = express.Router();
const assert = require('assert');

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded( {extended: true} )); // because Error: 'body-parser deprecated undefined extended'

//MongoConnect
//-------------->>>>Hier muss die passende Datenbank und die passende Collection angegeben werden!!!!!<<<<--------------
const url = 'mongodb://localhost:27017' // connection URL
const dbName = 'stadtfuehrerDB' // database name
const toursCollectionName = 'tours' // other collection name
//----------------------------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(url) // mongodb client



//Delete Tour - this post operation can be used to remove existing tours from the tours collection 
router.post('/removeTour', function(req, res, next)
{
    client.connect(function(err)
    {
        console.log('Connected successfully to server')
        const db = client.db(dbName)
        const collection = db.collection(toursCollectionName)
        var TourNameToDelete = req.body.TourNameToDelete;
        
        collection.find({TourNameToDelete: TourNameToDelete}).toArray(function(err, docs)
        {      
            if(docs.length >= 1){ //check if tour exists
                collection.deleteOne({TourNameToDelete: TourNameToDelete}, function(err, results){ //delte the tour from the tours collection
                })
                res.sendFile(__dirname + "/tours_config.html") //send positive response -> the post operation war successful
            }
            else { //if the tour does not exist
                res.sendFile(__dirname + "/errorData_tour.html") //send nonexistent tour error
            }
            
        })

    })
})
module.exports = router; //export as router
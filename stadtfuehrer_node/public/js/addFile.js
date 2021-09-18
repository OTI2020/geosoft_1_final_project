// if-condition checks if 'addFile' used for pois or tours
if (document.querySelector("#poi-read-button")) {
  console.log("poi-read-button was used");

  document.querySelector("#poi-read-button").addEventListener('click', function() {
    if(document.querySelector("#file-input").files.length == 0) {
      alert('Error : No file selected');
      return;
    }
    // file selected by user
    let file = document.querySelector("#file-input").files[0];
  
    // file MIME type
    let filename = (file.name).split(".");
    let file_type = filename[1];
    console.log(file_type)
    if(file_type=="json" || file_type=="geojson"){
      // new FileReader object
      let reader = new FileReader();
  
      // event fired when file reading finished
      reader.addEventListener('load', function(e) {
        // contents of the file
          let text = e.target.result;
          document.querySelector("#jsonText").textContent = text;
          document.getElementById("jsonText").value=text;
      });
  
      // event fired when file reading failed
      reader.addEventListener('error', function() {
          alert('Error : Failed to read file');
      });
  
      // read file as text file
      reader.readAsText(file);
    }else{
      alert('Error : Wrong File format selected');
    }
  });
  

/////////////////////////////////////////////////////////////////////

} else if (document.querySelector("#tour-read-button")) {
  console.log("tour-raed-button was used");

  /////////////////////////////////////////////////////////////////////
  //
  // similar process in the following, but for tours and not for pois
  //
  /////////////////////////////////////////////////////////////////////



  document.querySelector("#tour-read-button").addEventListener('click', function() {
    if(document.querySelector("#tour-file-input").files.length == 0) {
      alert('Error : No file selected');
      return;
    }
    // file selected by user
    let file = document.querySelector("#tour-file-input").files[0];
  
    // file MIME type
    let filename = (file.name).split(".");
    let file_type = filename[1];
    console.log(file_type)
    if(file_type=="json" || file_type=="geojson"){
      // new FileReader object
      let reader = new FileReader();
  
      // event fired when file reading finished
      reader.addEventListener('load', function(e) {
  
        // contents of the file
          var tour_json_text = e.target.result;
          document.querySelector("#tour-jsonText").textContent = tour_json_text;
          document.getElementById("tour-jsonText").value=tour_json_text;
  
          console.log("text");
          console.log(tour_json_text);
          console.log("tour-jsonText");
          console.log(document.getElementById("tour-jsonText"));
      });
  
      // event fired when file reading failed
      reader.addEventListener('error', function() {
          alert('Error : Failed to read file');
      });
  
      // read file as text file
      reader.readAsText(file);
    }else{
      alert('Error : Wrong File format selected');
    }
  });



  // save json in mongoDB Collection for tours

  var MongoClient = require('mongodb').MongoClient, format = require('util').format;


  MongoClient.connect('mongodb://127.0.0.1:27017/tours', function(err,db) {
    if (err) throw err;
    console.log("Connected to Database");

    // insert record
    db.collection('tours').insert(tour_json_text, function(err, records) {
        if (err) throw err;
        console.log("Record added as " + records[0]._id);
      });
  });



// 2. else-case: no button
} else console.log("nothing - no button was used")

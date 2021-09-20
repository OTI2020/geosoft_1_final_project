/**
 * Functionality to add Pois per JSON-File
 */
document.querySelector("#poi-read-button").addEventListener('click', function() {
  //catching empty files
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
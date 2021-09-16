function dateiupload(evt) {
  console.log("test")
    var dateien = evt.target.files; // FileList objekt

    // erste Datei auswählen (wichtig, weil IMMER ein FileList Objekt generiert wird)
    var uploadDatei = dateien[0];

    // Ein Objekt um Dateien einzulesen
    var reader = new FileReader();

    var senddata = new Object();
    // Auslesen der Datei-Metadaten
    senddata.name = uploadDatei.name;
    senddata.date = uploadDatei.lastModified;
    senddata.size = uploadDatei.size;
    senddata.type = uploadDatei.type;

    // Wenn der Dateiinhalt ausgelesen wurde...
    reader.onload = function(theFileData) {
      senddata.fileData = theFileData.target.result; // Ergebnis vom FileReader auslesen

      /*
      Code für AJAX-Request hier einfügen
      */
    }

    // Die Datei einlesen und in eine Data-URL konvertieren
    reader.readAsDataURL(uploadDatei);
  }
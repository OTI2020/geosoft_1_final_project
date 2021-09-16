let maxSnippetLength=250;
function getWikipediaData(name,url,json,exist){
    if(exist==1){
    let urlexists=checkURL(url);
    if(urlexists==true){
        let decodedURL = decodeURI(url);
        let urlslashsplit=decodedURL.split("/");
        let urldotsplit=urlslashsplit[2].split(".")
        let lang=urldotsplit[0];
        let title=urlslashsplit[4];
        console.log(title)
        try{
            console.log("getryed");
            $.getJSON("https://"+lang+".wikipedia.org/w/api.php?action=query&titles="+title+"&prop=extracts&exintro&explaintext&format=json&indexpageids&callback=?", function (data) {
            pageid=data.query.pageids[0];
            infotext=(data.query.pages[pageid].extract).substring(0,maxSnippetLength)
            formatInfotext=infotext.replaceAt(maxSnippetLength,"&#8230;")
            console.log(formatInfotext)
            return generateHTML(name,url,json,exist,"formatInfotext")
            });
            
        }catch(error){
            console.log("gecatched")
            return generateHTML(name,url,json,exist,"Keine Informationen verfügbar.")
        }
        
        /*
        // http://www.zacwitte.com/getting-wikipedia-summary-from-the-page-id
            $.ajax({
              url: 'http://' + lang + '.wikipedia.org/w/api.php',
              data: {
                action:'query',
                titles:title,
                prop:"extracts",
                format:'json'
              },
              dataType:'jsonp',
              
              success: function(data) {
                  console.log(data)
                $.ajax({
                  url: 'http://' + lang + '.wikipedia.org/w/api.php',
                  data: {
                    action: 'parse',
                    prop: data.prop,
                    page: title,
                    format:'json'
                  },
                  dataType:'jsonp',
                  success: function(data) {
                      console.log("spider")
                      console.log(data)
                      return generateHTML(name,url,json,exist,"Information");
                  }
                  
                });
                
              }
            });*/
            
    }else {
        return generateHTML(name,url,json,exist,"Keine Informationen verfügbar.")
    }}else return generateHTML(name,url,json,exist,"");
}
function checkURL(lurl){
    
    try {
        let slash=lurl.split("/");
        let dot=slash[2].split(".")
        const myURL = new URL(lurl);
        console.log(lurl);
        if(dot[1]==="wikipedia" && dot[2]==="org"){
            return true;
        }else return false;
        
    } catch (error) {
        console.log(lurl);
        return false;
    }
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
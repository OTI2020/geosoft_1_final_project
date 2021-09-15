function getWikipediaData(name,url,json,exist){
    if(exist==1){
    let urlslashsplit=url.split("/");
    let urldotsplit=urlslashsplit[2].split(".")
    let lang=urldotsplit[0];
    let title=urlslashsplit[4];
    if(checkURL(url, urldotsplit)==true){
        console.log(title)
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
                  console.log(data);
                $.ajax({
                  url: 'http://' + lang + '.wikipedia.org/w/api.php',
                  data: {
                    action: 'parse',
                    prop: "text",
                    pages: title,
                    format:'json'
                  },
                  dataType:'jsonp',
                  success: function(data) {
                      console.log(data)
                      return generateHTML(name,url,json,exist,data );
                    /*wikipage = $("<div>"+data.parse.title['*']+"<div>").children('p:first');
                    wikipage.find('sup').remove();
                    wikipage.find('a').each(function() {
                      $(this)
                        .attr('href', 'http://' + lang + '.wikipedia.org'+$(this).attr('href'));
                        
                    });*/
                    
                  }
                  
                });
                
              }
            });
            
    }else {
        return generateHTML(name,url,json,exist,"Keine Informationen verfügbar.")
    }}else return generateHTML(name,url,json,exist,"");
}
function checkURL(lurl, splitarray){
    console.log("Checks url")

    try {
        const myURL = new URL(lurl);
        console.log(lurl);
        if(splitarray[1]==="wikipedia" && splitarray[2]==="org"){
            return true;
        }else return false;
        
    } catch (error) {
        console.log(`${Date().toString()}: ${error.input} is not a valid url`);
        console.log( res.status(400).send(`${error.input} is not a valid url`));
        return false;
    }
}
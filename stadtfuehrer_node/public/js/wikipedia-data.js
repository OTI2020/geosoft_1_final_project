let maxSnippetLength=250;
function getWikipediaData(name,url,json,exist,layer){
    if(exist==1){
        let urlexists=checkURL(url);
        if(urlexists==true){
            let decodedURL = decodeURI(url);
            let urlslashsplit=decodedURL.split("/");
            let urldotsplit=urlslashsplit[2].split(".")
            let lang=urldotsplit[0];
            let title=urlslashsplit[4];
            try{
                $.getJSON("https://"+lang+".wikipedia.org/w/api.php?action=query&titles="+title+"&prop=extracts&exintro&explaintext&format=json&indexpageids&callback=?", function (data) {
                pageid=data.query.pageids[0];
                infotext=(data.query.pages[pageid].extract).substring(0,maxSnippetLength)
                formatInfotext=infotext.replaceAt(maxSnippetLength,"&#8230;")
                console.log("Wikipedia API request successful")
                generateHTML(name,url,json,exist,formatInfotext,layer)
                });
            }catch(error){
                return generateHTML(name,url,json,exist,"Keine Informationen verfügbar.",layer)
            }
        }else {
            return generateHTML(name,url,json,exist,"Keine Informationen verfügbar.", layer)
        }
    }else{
        return generateHTML(name,url,json,exist,"",layer);
    } 
}
function checkURL(lurl){
    
    try {
        let slash=lurl.split("/");
        let dot=slash[2].split(".")
        const myURL = new URL(lurl);
        if(dot[1]==="wikipedia" && dot[2]==="org"){
            return true;
        }else return false;
        
    } catch (error) {
        return false;
    }
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
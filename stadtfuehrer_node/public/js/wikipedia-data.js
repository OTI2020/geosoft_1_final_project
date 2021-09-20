/**
 * Parameter for Wikipedia info-text length in Map popup
 */
let maxSnippetLength=250;

/**
 * Gets infotext from given Wikipedia url and starts generation of popup html
 * @param {String} name 
 * @param {String} url 
 * @param {*} json 
 * @param {*} exist 
 * @param {*} layer 
 * @returns 
 */
function getWikipediaData(name,url,json,exist,layer){
    if(exist==1){ // to differentiate if the marker exist, to apply different layout
        let urlexists=checkURL(url);
        if(urlexists==true){
            // decleration of variables
            let decodedURL = decodeURI(url);
            let urlslashsplit=decodedURL.split("/");
            let urldotsplit=urlslashsplit[2].split(".")
            let lang=urldotsplit[0];
            let title=urlslashsplit[4];
            try{
                // JQuery for API data
                $.getJSON("https://"+lang+".wikipedia.org/w/api.php?action=query&titles="+title+"&prop=extracts&exintro&explaintext&format=json&indexpageids&callback=?", function (data) {
                pageid=data.query.pageids[0];
                infotext=(data.query.pages[pageid].extract).substring(0,maxSnippetLength);
                formatInfotext=infotext.replaceAt(maxSnippetLength,"&#8230;"); // replace last char with "..."
                // starting popup html generation
                generateHTML(name,url,json,exist,formatInfotext,layer);
                });
            }catch(error){
                // starts if query fails
                return generateHTML(name,url,json,exist,"Keine Informationen verfügbar.",layer);
            }
        }else {
            // starts if url is non-valid or no wikipedia url
            return generateHTML(name,url,json,exist,"Keine Informationen verfügbar.", layer);
        }
    }else{
        // starts if marker doesnt exist
        return generateHTML(name,url,json,exist,"",layer);
    } 
}

/**
 * Checks if a url exist and if its a valid wikipedia.org url
 * @param {String} lurl 
 * @returns Boolean
 */
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

/**
 * Replaces a char at an given index with another given char
 * @param {*} index 
 * @param {*} replacement 
 * @returns 
 */
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
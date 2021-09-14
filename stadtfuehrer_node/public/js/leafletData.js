function fillPopupHTML(name, url, json){
    let Lname=name;
    let Lurl=url;
    let Ljson=json;
    
    let htmlString="<form action='/add/newpoi' method='post' class='form-horizontal' role='form'>"+
        "<fieldset>"+
            "<div class='form-group odd'>"+
                "<label class='form-label'>Name:&nbsp;</label>"+
                "<input type='text' class='form-input' name='pname' value='"+Lname+"'/>"+
            "</div>"+
            "<div class='form-group even'>"+
                "<label>URL (Wikipedia):&nbsp;</label>"+
                "<input type='text' name='purl' value='"+Lurl+"'/>"+
            "</div>"+
            "<div class='form-group odd'>"+
                "<label>Beschreibung:&nbsp;</label>"+
                "<label name='pdescribe' placeholder='keine Information verfügbar'></label>"+
            "</div>"+
            "<div class='form-group odd'>"+
                "<label>Koordinaten:&nbsp;</label>"+
                "<input type='text' name='pjson' readonly='readonly'value='"+Ljson+"'/>"+
            "</div>"+
        "</fieldset>"+
        "<button class='btn pupBtn' type='submit'>Speichern</button>"+
    "</form>";
    return htmlString;
}
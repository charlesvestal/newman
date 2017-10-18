function wrapInClass(s, name) {
  return "<span class='" + name + "'>" + s + "</span>";
}

function splitMap(s, sep, f) {
  return s.split(sep).map(f).join(sep);
}

function loadData(sheetID) {
        Papa.parse("https://docs.google.com/spreadsheets/d/" + sheetID + "/export?gid=0&format=csv", {
            download: true,
            complete: function(results) {
                document.getElementById("newman").innerHTML = "";
                results.data.forEach(
                    function writeData(item) {
                        
                    var line = splitMap(item[0], " ", function(word) {
                        var resultWord = splitMap(word, "", function(char) {
                            return wrapInClass(char, "rotate-character");
                        });
                        return wrapInClass(resultWord, "word");
                        });
                    
                    line = wrapInClass(line, "line");
                        document.getElementById("newman").innerHTML += line;
                    });
                    
                    rotateCharacters();
            }
        });
    };

function rotateCharacters() {
         var rotate = 0;
                    $("#newman .rotate-character").each(function() {
                        // set a +/- max character rotation in degrees 
                        rotatelimit = 5;  
                        rotate = (Math.floor(Math.random() * (rotatelimit * 2)) + 1) - rotatelimit;
                        $(this).css({
                            "-webkit-transform": "rotate(" + rotate + "deg)",
                            "display": "inline-block"
                        });
                    });
}
   
window.onload = function() {
    loadData(signSheetID);
    setInterval(function() {
        loadData(signSheetID);
    }, 30000);
};
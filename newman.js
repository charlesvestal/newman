function loadData(sheetID) {
        Papa.parse("https://docs.google.com/spreadsheets/d/" + sheetID + "/export?gid=0&format=csv", {
            download: true,
            complete: function(results) {
                document.getElementById("newman").innerHTML = "";
                results.data.forEach(
                    function writeData(item) {
                        var lineOut = "<span class='line'>";                                // begin a new line
                        var lineArray = item[0].split(" ");                                 // split into words
                        
                        lineArray.forEach(function(word) {
                            var characterArray = word.split("");                            // split into characters
                            lineOut += "<span class='word'>"                                // begin a new word      
                            characterArray.forEach(function(character) {
                                lineOut += "<span class='rotate'>" + character + "</span>"; // wrap each character
                            });                           
                            lineOut += "</span>" + " ";                                     // end the word and add a space
                        });
                        lineOut += "</span>"                                                // end the line
                        document.getElementById("newman").innerHTML += lineOut;
                    });
                    rotateCharacters();
            }
        });
    };

function rotateCharacters() {
         var rotate = 0;
                    $("#newman .rotate").each(function() {
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
function loadData(sheetID) {
        Papa.parse("https://docs.google.com/spreadsheets/d/" + sheetID + "/export?gid=0&format=csv", {
            download: true,
            complete: function(results) {
                document.getElementById("newman").innerHTML = "";
                results.data.forEach(
                    function writeData(item) {
                        // wrap each character in a span 
                        var line = item[0].replace(/./g, "<span class='rotate'>$&</span>"); 
                        //use spaces as word delimiters
                        line = line.replace(new RegExp("<span class='rotate'> </span>", "g"), "</span> <span class='word'>"); 
                        //insert each line
                        document.getElementById("newman").innerHTML += "<span class='line'><span class='word'>" + line + "</span></span>"; + "<br/>"; 
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
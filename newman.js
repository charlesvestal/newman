// set a +/- max character rotation in degrees 
var ROTATE_LIMIT = 5;

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
                            return wrapInClass(char, "character rotate-character");
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

// make a real Array from any Iterable (like the nodelist document.querySelectorAll returns)
var toArray;
if (typeof Array.from !== 'function') {
  toArray = Array.from.bind(Array);
} else {
  toArray = function toArray(iterable) {
    return Array.prototype.slice.call(iterable);
  };
}

var applyProps = [
  'transform',
  'webkitTransform',
  'mozTransform',
  'oTransform',
  'msTranform'
];
function setTransform(node, value) {
  applyProps.forEach(function (prop) {
    node.style[prop] = value;
  });
}

function rotateCharacters() {
  var toRotate = toArray(document.querySelectorAll('#newman .rotate-character'));
  toRotate.forEach(function rotate(node) {
    var rotate = Math.random() * (ROTATE_LIMIT * 2) + 1 - ROTATE_LIMIT;
    setTransform(node, 'rotate(' + rotate + 'deg)');
  });
}
   
window.onload = function() {
    loadData(signSheetID);
    setInterval(function() {
        loadData(signSheetID);
    }, 30000);
};




var x = document.getElementById("error");
  function getLocation() {
    $("#loc").show();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    var lat = position.coords.latitude; 
    var lon = position.coords.longitude;
}
  function getDistance() {
    $("#loc2").show();
    var x = rangeSlider.getData();
    $("#test").text("selected : " + x);
  }



window.onload = function(){
  rangeSlider.init();
  rangeSlider.getData();
}

var rangeSlider = {
  s: null,
  init: function(){
    rangeSlider.s = $("#trackLength").slider({});
  },
  getData: function(){
    var value = rangeSlider.s.slider('getValue')
    console.log(value);
    return value;
  }
}


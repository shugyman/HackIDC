
$(document).ready(function(){
$(".btn-default").click(function(){
   $("#sec01but02").toggleClass("btn-info");
   $("#sec01but01").toggleClass("btn-info");
 
});


});

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
    var latlon = 2.2 + "," + 35;

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";

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


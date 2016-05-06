$(document).ready(function(){
$(".btn-default").click(function(){
   $("#sec01but02").toggleClass("btn-info");
   $("#sec01but01").toggleClass("btn-info");
});

var step1 = {
  myLocation: {
    log: null,
    lat: null
  },
  init: function(){
    
  }
}

var step2 = {
  distance: {
    min: null,
    max: null
  },
  location: {
    log: null,
    lat: null
  },
  init: function(log, lat){
    this.location.log = log;
    this.location.lat = lat;
  },

  getData: function(){
    var temp = rangeSlider.getData();
    this.distance.min = temp[0];
    this.distance.max = temp[1];
    return (this.distance.min > 0 && this.distance.max > 0);
  },

  launch: function(){
    if(step2.getData()){
      step3.init();
    } else {
      console.log("error in step2");
    }
  }
}

var step3 = {
  init: function(){

  }
}


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
}

var rangeSlider = {
  s: null,
  init: function(){
    rangeSlider.s = $("#trackLength").slider({});
  },
  getData: function(){
    var value = rangeSlider.s.slider('getValue')
    return value;
  }
}


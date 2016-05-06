$(document).ready(function(){
  app.init();  
  //TEMPORARY:
  step3.init();
});



var app = {
  init: function(){
      $("#sec02but01").on('click', step2.launch);
      $("#googleMap").hide();
      $("#step1 button").click(function(){
      $("#googleMap").show(); 
      $("#sec01but02").toggleClass("btn-info");
      $("#sec01but01").toggleClass("btn-info");
    });

    $('#getStarted').on('click', function(){
      step1.init();
    });
    step1.createMap();
  }
}

var step1 = {
  myLocation: {
    log: null,
    lat: null
  },
  otherLocation: {
    log: null,
    lat: null
  },
  isLocationAvailable: false,

  init: function(){
    console.log('step1 inititialized');
    step1.isLocationAvailable = step1.tryToGetLocation();

  },
  tryToGetLocation: function(){
    var temp = step1.getMyLocation();
    // TODO
    //return true if successful
    //update log and lat
  },
  otherLocationClicked: function(){
    
  },
  createMap: function(x,y){
    function initialize() {
      var mapProp = {
        center:new google.maps.LatLng(x,y),
        zoom:5,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  },
  getMyLocation: function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(utilFunc, errorFunc);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    function errorFunc(error){
      console.log("no location");
      console.log(error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
    }
    function utilFunc(position){
      step1.myLocation.lat = position.coords.latitude; 
      step1.myLocation.lon = position.coords.longitude;
      console.log(step1.myLocation);
    }
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
    console.log('step 2 inititialized');
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
    if(step2.getData() && step2.location.log != null && step2.location.lat != null){
      step3.init();
    } else {
      console.log("error in step2");
      console.log(step2.distance);
      console.log(step2.location);
    }
  },
}

var step3 = {
  data: null,
  
  tempData: [{"geoname_id": 6254976, "lat": 48.8582, "lon": 2.2945, "yapq_grade": 5, "title": "Eiffel Tower"}, {"geoname_id": 6269533, "lat": 48.8738, "lon": 2.295, "yapq_grade": 4.39, "title": "Arc de Triomphe"}, {"geoname_id": 6452892, "lat": 48.8867, "lon": 2.343, "yapq_grade": 4.36, "title": "Sacr\u00e9-C\u0153ur, Paris"}, {"geoname_id": 6269274, "lat": 48.853, "lon": 2.3498, "yapq_grade": 4, "title": "Notre Dame de Paris"}, {"geoname_id": 0, "lat": 48.8622, "lon": 2.3325, "yapq_grade": 3.52, "title": "Tuileries Palace"}],
  init: function(){
    if(true){ // FOR DEMO PURPOSES
      console.log(this.tempData);
      step3.createStep();
      return ;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     step3.data = xhttp.responseText;
     console.log(step3.data);
    }
    step3.createStep();
  };

  //http://localhost:8080/GetPOI?lat=52.5186234&lon=13.3739984&rad=5
  var url = "<<<PORT>>>/GetPOI?lat=" + lat + "&lon=" + lon + "&rad=" + rad;
  xhttp.open("GET", "demo_get2.asp?fname=Henry&lname=Ford", true);
  xhttp.send();
  },

  createStep: function(){
    var d = step3.data;
    if(d == null){
      d = step3.tempData;
    }
    var container = $("#poiContainer");

    for(i = 0; i < d.length; i++){
      var div = $('<div></div>');
      var st = "";
      st+= '<label><input type="checkbox" value="' + i + '">';
      st+= d[i].title + '</label>'
      var st2 = "<i> rating: " + d[i].yapq_grade + "</i>";
      var e = $(st);
      var e2 = $(st2);
      div.append(e);
      div.append(e2);
      container.append(div);
    }
    
  }
};

step4 = {
  // ARRAY of ids of pois
  init: function(arr){

  }
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
    var value = rangeSlider.s.slider('getValue');
    return value;
  }
}


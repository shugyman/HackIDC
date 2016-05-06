$(document).ready(function(){
  app.init();
});


var app = {
  init: function(){
    $("#sec02but01").on('click', step2.launch);
    
    $("#step1 button").click(function(){
      $("#sec01but02").toggleClass("btn-info");
      $("#sec01but01").toggleClass("btn-info");
    });

    $('#getStarted').on('click', function(){
      step1.init();
    });
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
    // TODO
    //return true if successful
    //update log and lat
  },
  otherLocationClicked: function(){

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
      return ;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     step3.data = xhttp.responseText;
     console.log(step3.data);
    }
  };
  xhttp.open("GET", "demo_get2.asp?fname=Henry&lname=Ford", true);
  xhttp.send();
  },

  createStep: function(){

  }
};


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
    var value = rangeSlider.s.slider('getValue');
    return value;
  }
}


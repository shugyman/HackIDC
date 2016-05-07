$(document).ready(function(){
  app.init();  
  //TEMPORARY:
  step3.init();
});




var app = {
  init: function(){ 
      $("#sec02but01").on('click', step2.launch);
      $("#googleMap").hide();
      $("#floating-panel").hide();
      $("#sec02address h2").hide();


      $("#step1 button").click(function(){
      $("#googleMap").show(); 
      $("#sec01but02").toggleClass("btn-info");
      $("#sec01but01").toggleClass("btn-info");
    });


      $("#s1btns button").on('click', function(){
        $("#s1btns button").removeClass("btn-info");
        $(this).addClass("btn-info");
      });

            $("#sec01alertclose").click(function(){
        $("#sec01alert").hide();
      });
      $("#sec01alertclose2").click(function(){
        $("#sec01alert02").hide();
      });
    
      $("#sec01but01").click(function(){
        $("#floating-panel").hide();
        $("#sec02address h2").hide();
        step1.getMyLocation();
        step1.createMap();
      });

      $("#sec01but02").on('click', function(){
        $("#floating-panel").show();
        $("#sec02address h2").show();
        $("#googleMap").show();
      });
      step1.init();
    step1.createMap();
  }
}

var step1 = {
  myLocation: {
    lng: 0,
    lat: 0
  },
  otherLocation: {
    lng: null,
    lat: null
  },
  choiseLocation: {
    lng: 0,
    lat: 0
  },
  isLocationAvailable: false,

  init: function(){
    console.log('step1 inititialized');
    step1.getMyLocation();

  },
  otherLocationClicked: function(){
    
  },
  createMap: function(){
    function initialize() {
      var mapProp = {
        center:new google.maps.LatLng(step1.myLocation.lat, step1.myLocation.lng),
        zoom:10,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
      var marker=new google.maps.Marker({
        position:new google.maps.LatLng(step1.myLocation.lat, step1.myLocation.lng),
        });

        marker.setMap(map);
         var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          step1.geocodeAddress(geocoder, map);
        });  
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  },
  geocodeAddress: function(geocoder, resultsMap){
    var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            step1.otherLocation.lat = results[0].geometry.location.lat();
            step1.otherLocation.lng = results[0].geometry.location.lng();
            step1.choiseLocation.lat = results[0].geometry.location.lat();
            step1.choiseLocation.lng = results[0].geometry.location.lng();
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            $(".alert").hide();
            $("#sec01alert").show();
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      },
  getMyLocation: function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(utilFunc, errorFunc);
    } else {
      console.log("Geolocation is not supported by this browser.");
      step1.isLocationAvailable = false;
    }

    function errorFunc(error){
      $(".alert").hide();
      $("#sec01alert02").show();
      console.log("no location");
      console.log(error.code);
      // error.code can be:
      //   0: unknown error
      //   1: permission denied
      //   2: position unavailable (error response from location provider)
      //   3: timed out
      step1.isLocationAvailable = false;
    }
    function utilFunc(position){
      $(".alert").hide();
      $("#sec01alert").show();
      step1.myLocation.lat = position.coords.latitude; 
      step1.myLocation.lng = position.coords.longitude;
      step1.choiseLocation.lat = position.coords.latitude; 
      step1.choiseLocation.lng = position.coords.longitude;
      step1.isLocationAvailable = true;
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

  //http://localhost:8080/GetPOI?lat=52.5186234&lon=13.3739984&rad=5  32.0630685,34.7622803 41.390938, 2.160443
  var lat = 41.390938;
  var lon = 2.160443;
  var url = "http://localhost:8080/GetPOI?lat=" + lat + "&lon=" + lon + "&rad=" + 5;
  console.log(url);
  xhttp.open("GET", url, true);
  xhttp.send();
  },

  createStep: function(){
    var d = step3.data;
    if(d == null){
      d = step3.tempData;
    }
    var container = $("#poiContainer table");

    for(i = 0; i < d.length; i++){
      var div = $('<tr></tr>');
      var st = "";
      st+= '<td><label><input type="checkbox" value="' + i + '" checked></td><td>';
      st+= d[i].title + '</label></td>'
      var st2 = "<td>" + d[i].yapq_grade + "</td>";
      var st3 = '<td><button id = "pic' + i + '" class="btn btn-sm btn-info">show</button></td>';
      var e = $(st);
      var e2 = $(st2);
      var e3 = $(st3);
      div.append(e);
      div.append(e2);
      div.append(e3);
      container.append(div);
    }
    
  },
  getPhotoUrl: function(){


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


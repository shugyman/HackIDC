$(document).ready(function(){
  app.init();  
  //TEMPORARY:
  step3.init();
});




var app = {
  init: function(){ 
      $("#sec02but01").on('click', step2.launch);
      $("#floating-panel").hide();
      $("#sec02address h2").hide();


      $("#step1 button").click(function(){
      $("#googleMap").show(); 
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
        step1.setMap();
      });

      $("#sec01but02").on('click', function(){
        $("#floating-panel").show();
        $("#sec02address h2").show();
        $("#googleMap").show();
      });
      step1.init();
      step1.createMap();
      step4.init();// for testing
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
  map: null,
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
        zoom:18,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
      step1.map = map;
      if (step1.marker != null){
        step1.marker.setMap(null);
      }
      step1.marker =new google.maps.Marker({
        position:new google.maps.LatLng(step1.myLocation.lat, step1.myLocation.lng),
        });

        step1.marker.setMap(map);
         var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          step1.geocodeAddress(geocoder, map);
        });  
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  },
  setMap:function(){
    step1.map.setCenter(new google.maps.LatLng(step1.myLocation.lat, step1.myLocation.lng));
    step1.map.setZoom(18);
    if (step1.marker != null){
        step1.marker.setMap(null);
    }
    step1.marker=new google.maps.Marker({
        position:new google.maps.LatLng(step1.myLocation.lat, step1.myLocation.lng),
        });

        step1.marker.setMap(step1.map);

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
            step2.init(step1.choiseLocation.lat, step1.choiseLocation.lng);
             if (step1.marker != null){
                step1.marker.setMap(null);
              }
            step1.marker = new google.maps.Marker({
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
      step2.init(step1.choiseLocation.lat, step1.choiseLocation.lng);
      step1.isLocationAvailable = true;
      step1.setMap();
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
    this.location.log = log;
    this.location.lat = lat;
    console.log('step 2 inititialized' + this.location.log + " " + this.location.lat);
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
  map:null,
  tempData: [{"main_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/400px-Brandenburger_Tor_abends.jpg", "title": "Brandenburg Gate", "lon": 13.3777, "geoname_id": 6698677, "yapq_grade": 4.99, "lat": 52.5163}, {"main_image": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Berlinermauer.jpg", "title": "Berlin Wall", "lon": 13.3769, "geoname_id": 26537, "yapq_grade": 4.63, "lat": 52.5161}, {"main_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Berlin_Museumsinsel_Fernsehturm.jpg/400px-Berlin_Museumsinsel_Fernsehturm.jpg", "title": "Museum Island", "lon": 13.3956, "geoname_id": 7669158, "yapq_grade": 4.25, "lat": 52.5214}, {"main_image": "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Berliner_Fernsehturm_November_2013.jpg/640px-Berliner_Fernsehturm_November_2013.jpg", "title": "Fernsehturm Berlin", "lon": 13.4094, "geoname_id": 6325497, "yapq_grade": 4.24, "lat": 52.5208}, {"main_image": "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Reichstag_building_Berlin_view_from_west_before_sunset.jpg/280px-Reichstag_building_Berlin_view_from_west_before_sunset.jpg", "title": "Reichstag building", "lon": 13.3752, "geoname_id": 6944090, "yapq_grade": 3.74, "lat": 52.5186}, {"main_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anhalter_Bahnhof_2005.jpg/400px-Anhalter_Bahnhof_2005.jpg", "title": "Berlin Anhalter Bahnhof", "lon": 13.3819, "geoname_id": 7911213, "yapq_grade": 3.19, "lat": 52.5031}, {"main_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bauakadm1.jpg/400px-Bauakadm1.jpg", "title": "Bauakademie", "lon": 13.3989, "geoname_id": 18472, "yapq_grade": 2.22, "lat": 52.5161}, {"main_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Berlin_Nationaldenkmal_Kaiser_Wilhelm_mit_Schloss_1900.jpg/400px-Berlin_Nationaldenkmal_Kaiser_Wilhelm_mit_Schloss_1900.jpg", "title": "City Palace, Berlin", "lon": 13.4028, "geoname_id": 10376554, "yapq_grade": 2.16, "lat": 52.5175}, {"main_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/1895_reichskanzlerpalais.jpg/400px-1895_reichskanzlerpalais.jpg", "title": "Reich Chancellery", "lon": 13.3819, "geoname_id": 14829, "yapq_grade": 2.09, "lat": 52.5117}, {"main_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Berlin_Krolls_Wintergarten_c1850.jpg/400px-Berlin_Krolls_Wintergarten_c1850.jpg", "title": "Kroll Opera House", "lon": 13.3683, "geoname_id": 31488, "yapq_grade": 1.5, "lat": 52.5186}],
  
  init: function(){
    var dist = step2.distance;
    var loc = step2.location;
    console.log("step3 inititialized");
    console.log(dist, loc);
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
    var temp = $("#photosThead");
    container.empty();
    container.append(temp);
    console.log(d[0].main_image);
    for(i = 0; i < d.length; i++){
      var div = $('<tr></tr>');
      var st = "";
      st+= '<td><label><input type="checkbox" value="' + d[i].id + '" checked></td><td>';
      st+= d[i].title + '</label></td>'
      var st2 = "<td>" + d[i].yapq_grade + "</td>";
      var e = $(st);
      var e2 = $(st2);
      div.append(e);
      div.append(e2);
      container.append(div);
      step3.initImgHandler(d, i, e);
    }
  },
  initImgHandler: function(d, i, e){
    e.on('mouseenter click', function(){
      document.getElementById("poiImg").src = d[i].main_image;
    });
  }

};

step4 = {
  data: null,
  tempData: [{"length": 5.092, "pois": [{"geoname_id": 6698677, "lat": 52.5163, "lon": 13.3777, "yapq_grade": 4.99, "title": "Brandenburg Gate"}, {"geoname_id": 7669158, "lat": 52.5214, "lon": 13.3956, "yapq_grade": 4.25, "title": "Museum Island"}]}, {"length": 4.377, "pois": [{"geoname_id": 7669158, "lat": 52.5214, "lon": 13.3956, "yapq_grade": 4.25, "title": "Museum Island"}]}, {"length": 2.45, "pois": [{"geoname_id": 6698677, "lat": 52.5163, "lon": 13.3777, "yapq_grade": 4.99, "title": "Brandenburg Gate"}]}, {"length": 7.938, "pois": [{"geoname_id": 6325497, "lat": 52.5208, "lon": 13.4094, "yapq_grade": 4.24, "title": "Fernsehturm Berlin"}]}, {"length": 7.956, "pois": [{"geoname_id": 6325497, "lat": 52.5208, "lon": 13.4094, "yapq_grade": 4.24, "title": "Fernsehturm Berlin"}, {"geoname_id": 7669158, "lat": 52.5214, "lon": 13.3956, "yapq_grade": 4.25, "title": "Museum Island"}]}, {"length": 8.341, "pois": [{"geoname_id": 6325497, "lat": 52.5208, "lon": 13.4094, "yapq_grade": 4.24, "title": "Fernsehturm Berlin"}, {"geoname_id": 6698677, "lat": 52.5163, "lon": 13.3777, "yapq_grade": 4.99, "title": "Brandenburg Gate"}]}],
  // ARRAY of ids of pois
  init: function(arr){
    step4.createTable();
    // send ajax to get routes
    // put routes in data variable
  },
      setMap:function(i){
        var key = "AIzaSyDfVoMuakzyG9Pw2xmKfM4XgUZkLulvOm8";
        var str = "https://www.google.com/maps/embed/v1/directions?key=" + key;
        var d = step4.tempData;
        console.log(i);
        str += "&origin=" + "52.507629,13.1449502";
        str += "&destination=" + "52.507629,13.1449502";
        str += "&waypoints=";
        console.log(str);
        for (var j = 0; j < d[i].pois.length; j++){
          str += d[i].pois[j].lat;
          str += ",";
          str += d[i].pois[j].lon;
          if(j != d[i].pois.length - 1)
            str += "|";
        }
         str += "&mode=walking" ;

        document.getElementById("googleMapResult").src = str;

  },
  createTable: function(){
    var d = step4.data;
    if(d == null){
      d = step4.tempData;
    }
    var container = $("#routesContainer table");
    for(var i = 0; i < d.length; i++){
      var div = $('<tr></tr>');
      var st = '<td><label><input type="checkbox" value="' + i + '" checked></label></td>';
      var st2 = '<td>';
      for (var j = 0; j < d[i].pois.length; j++){
      st2 += d[i].pois[j].title;
      st2 += ", ";
      }
      st2 += '</td>';
      var st3 = "<td>" + d[i]["length"]+ "</td>";
      var st4 = '<td><button onclick="step4.setMap(' + i + ')" id = "pic' + i + '" class="btn btn-sm btn-info">Show Map</button></td>';
      var e = $(st);
      var e2 = $(st2);
      var e3 = $(st3);
      var e4 = $(st4);
      div.append(e);
      div.append(e2);
      div.append(e3);
      div.append(e4);
      container.append(div);
    }
  }
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


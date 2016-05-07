$(document).ready(function(){
  app.init();  
  //TEMPORARY:
  //step3.init();
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

      $("#sec03but01").on('click', step3.launch);

      step1.init();
      step1.createMap();
      //step4.init();// for testing
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
            step2.init(step1.choiseLocation.lng, step1.choiseLocation.lat);
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
      step2.init(step1.choiseLocation.lng, step1.choiseLocation.lat);
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

  init: function(){
    var dist = step2.distance;
    var loc = step2.location;
    console.log("step3 inititialized");
    console.log(dist, loc);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
     step3.data = JSON.parse(xhttp.responseText);
     console.log(step3.data);
     step3.createStep();
    }
  };

  var url = "http://" + location.hostname + ":8080/GetPOI?lat=" + loc.lat + "&lon=" + loc.log + "&rad=" + dist.max/2;
  console.log(url);
  xhttp.open("GET", url, true);
  xhttp.send();
  },

  createStep: function(){
    var d = step3.data;
    var container = $("#poiContainer table");
    var temp = $("#photosThead");
    container.empty();
    container.append(temp);
    for(i = 0; i < d.length; i++){
      var div = $('<tr></tr>');
      var st = "";
      st+= '<td><label><input type="checkbox" id="cba' + i + '" checked></td><td>';
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
  },
  launch: function(){
    var selected = new Array();
    for(var i = 0; i < step3.data.length; i++){
      var a = document.getElementById('cba' + i);
      if(a.checked){
        selected.push(step3.data[i].geoname_id);
      }
    }
    console.log(selected);
    step4.init(selected);
  },

};

step4 = {
  data: null,
  tempData: [{"length": 5.092, "pois": [{"geoname_id": 6698677, "lat": 52.5163, "lon": 13.3777, "yapq_grade": 4.99, "title": "Brandenburg Gate"}, {"geoname_id": 7669158, "lat": 52.5214, "lon": 13.3956, "yapq_grade": 4.25, "title": "Museum Island"}]}, {"length": 4.377, "pois": [{"geoname_id": 7669158, "lat": 52.5214, "lon": 13.3956, "yapq_grade": 4.25, "title": "Museum Island"}]}, {"length": 2.45, "pois": [{"geoname_id": 6698677, "lat": 52.5163, "lon": 13.3777, "yapq_grade": 4.99, "title": "Brandenburg Gate"}]}, {"length": 7.938, "pois": [{"geoname_id": 6325497, "lat": 52.5208, "lon": 13.4094, "yapq_grade": 4.24, "title": "Fernsehturm Berlin"}]}, {"length": 7.956, "pois": [{"geoname_id": 6325497, "lat": 52.5208, "lon": 13.4094, "yapq_grade": 4.24, "title": "Fernsehturm Berlin"}, {"geoname_id": 7669158, "lat": 52.5214, "lon": 13.3956, "yapq_grade": 4.25, "title": "Museum Island"}]}, {"length": 8.341, "pois": [{"geoname_id": 6325497, "lat": 52.5208, "lon": 13.4094, "yapq_grade": 4.24, "title": "Fernsehturm Berlin"}, {"geoname_id": 6698677, "lat": 52.5163, "lon": 13.3777, "yapq_grade": 4.99, "title": "Brandenburg Gate"}]}],
  // ARRAY of ids of pois

  init: function(arr){
    console.log("step4 inited");
     var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      step4.data = JSON.parse(xhttp.responseText);
      step4.createTable();
      console.log(step4.data);
     }
    };

    var lat = step1.choiseLocation.lat;
    var lon = step1.choiseLocation.lng;
    var url = "http://" + location.hostname + ":8080/GetRoutes?lat=" + lat + "&lon=" + lon + "&distance=" + step2.distance.max/2 +"&pois=[" ;
    for(i = 0; i < arr.length; i++){
      url+= arr[i];
      url+= (i != arr.length - 1) ? "," : "]";
    }
    //http://10.10.17.162:8080/GetRoutes?lat=48.854885&lon=2.295627&distance=15&pois=[6452892,6269274,6269533,6254976]

    xhttp.open("GET", url, true);
    xhttp.send();
      
    },
      setMap:function(i){
        var key = "AIzaSyDfVoMuakzyG9Pw2xmKfM4XgUZkLulvOm8";
        var str = "https://www.google.com/maps/embed/v1/directions?key=" + key;
        var d = step4.data;
        if(d == null){
           d = step4.tempData;
          }
        str += "&origin=" + step1.choiseLocation.lat + "," + step1.choiseLocation.lng;
        str += "&destination=" + step1.choiseLocation.lat + "," + step1.choiseLocation.lng;
        str += "&waypoints=";
        for (var j = 0; j < d[i].pois.length; j++){
          str += d[i].pois[j].lat;
          str += ",";
          str += d[i].pois[j].lon;
          if(j != d[i].pois.length - 1)
            str += "|";
        }
         str += "&mode=walking" ;
        console.log(str);
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
      if(j != d[i].pois.length - 1)
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


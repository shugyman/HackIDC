var x = document.getElementById("loc");
  function getLocation() {
    $("#button").click(function(){
    $("#loc").show();
   });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    var lat = position.coords.latitude; 
    var lon = position.coords.longitude
    x.innerHTML = "Latitude: " + lat + 
    "<br>Longitude: " + lon; 
}
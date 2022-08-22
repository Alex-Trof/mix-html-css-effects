function initMap() {
  var map = L.map("map").setView([40.91, -96.63], 4);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var searchControl = L.esri.Geocoding.geosearch({
    position: "topright",
    placeholder: "Enter an address or place e.g. 1 York St",
    useMapBounds: false,
    providers: [
      L.esri.Geocoding.arcgisOnlineProvider({
        apikey:
          "AAPK4f3ef6fd6c4e455e88a655b50c1fc4e6HbZYa1zxzt6psqZUjDyYIEfRKC0uAVI3JjRkS6oyTW9SbG8kNlxTIQFgfXKfc-fu", // replace with your api key - https://developers.arcgis.com
        nearby: {
          lat: -33.8688,
          lng: 151.2093,
        },
      }),
    ],
  }).addTo(map);

  var results = L.layerGroup().addTo(map);

  searchControl.on("results", function (data) {
    console.log(data);
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });
}

window.onload = function () {
  initMap();

  const cityInput = document.getElementById("cityInput");
  const map = document.getElementById("map");

  const geoInput = document.getElementsByClassName(
    "geocoder-control-input leaflet-bar"
  )[0];

  const cityInputHandler = function (e) {
    geoInput.value = this.value;

    if (this.value.length > 3) {
      map.style.opacity = "1";
      map.style.zIndex = 0;
      geoInput.focus();
    }
  };

  geoHandler = function (e) {
    cityInput.value = this.value;
    if (this.value.length <= 3) {
      map.style.opacity = "0";
      map.style.zIndex = -1;
      cityInput.focus();
    }
  };

  geoInput.addEventListener("input", geoHandler);
  cityInput.addEventListener("input", cityInputHandler);
};

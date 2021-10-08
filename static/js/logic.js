// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);

function createMarkers(response) {
  console.log(response);

  // Create variable stations and assign to it response.data.stations

  var stations = response.data.stations;
  

  // Initialize an array to hold bike markers.

  var bikeMarkers = [];
  

  // Loop through the stations array.
   for (var index = 0; index <  stations.length; index++) {
     var station = stations[index];
    

    // For each station, create a marker, and bind a popup with the station's name.
      var bikeMarker = L.marker([station.lat, station.lon])
       .bindPopup("<h3>" + station.name + "<h3>Capacity" + station.capacity + "</h3>"); 

    

    // Add the marker to the bikeMarkers array.
       bikeMarkers.push(bikeMarker);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(bikeMarkers));
}

function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.

  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  

  // Create a baseMaps object to hold the streetmap layer.
  
  var baseMaps = {
    "Street Map": street
  }; 

  // Create an overlayMaps object to hold the bikeStations layer.

  var overlayMaps = {
    "Bike Stations": bikeStations
  };
  

  // Create the map object with options.

   var map = L.map("map-id", {
     center: [40.754389895923616, -74.0662343369025], 
     zoom: 10,
     layers: [street, bikeStations]
   });
  

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map)
      
}

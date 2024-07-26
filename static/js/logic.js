// Load the GeoJSON data.
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

d3.json(geoData).then(function(data){
    createFeatures(data.features);
    console.log('entro a la primera funcion');
});

function createFeatures(earthquakeData){
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.title}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Type: ${feature.properties.type}</p>
        <p>Magnitude: ${feature.properties.mag}</p><p>Location: ${feature.properties.place}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
        layer.bindTooltip(`<h3>Click to see more info</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Location: ${feature.properties.place}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`)
      }

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
      });

    createMap(earthquakes);
}


function createMap(earthquakes){
    // Adding the tile layer
    let background = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps={
        "Background":background
    };

    let overlayMaps = {
        Earthquakes: earthquakes
    };
 
    // Creating the map object
      let myMap = L.map("map",{
          center: [23.13302, -82.38304],
          zoom: 4,
          layers: [background, earthquakes]
      });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);

}
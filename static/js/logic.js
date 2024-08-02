// Load the GeoJSON data.
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Set map center and zoom level
let myMap = L.map("map",{
    center: [23.13302, -82.38304],
    zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Set markers size depending on magnitude
function markerSize(magnitude){
    return magnitude*3;
};

//Set markers color based on depth
function markerColor(depth){
    if (depth < 10){
        return "#a3f600";
    }else if (depth >= 10 && depth < 30){
        return "#dcf400";
    }else if (depth >= 30 && depth < 50){
        return "#f7db11";
    }else if (depth >= 50 && depth < 70){
        return "#fdb72a";
    }else if (depth >= 70 && depth < 90){
        return "#fca35d";
    }else
        return "#ff5f65";
};

//get json data and paint markers on map
d3.json(geoData).then(function(data){
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: markerSize(feature.properties.mag),
            fillColor: markerColor(feature.geometry.coordinates[2]),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          });
        },
//Adding the popup that appears when hovering or clicking on the marker
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.title}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Type: ${feature.properties.type}</p>
            <p>Magnitude: ${feature.properties.mag}</p><p>Location: ${feature.properties.place}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
            layer.bindTooltip(`<h3>Click to see more info</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Location: ${feature.properties.place}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
        }
    }).addTo(myMap)
});
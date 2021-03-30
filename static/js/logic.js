//Interactive map JS - needs "har.geojson"

// //Store our API endpoint inside queryUrl
// // use this path when map.index is in root directoryt
// let queryUrl = "static/data/har.geojson";

// //Store our API endpoint inside queryUrl
// // use this path when map.index is in template
let queryUrl = "../static/data/har.geojson";

// C:\Users\troyy\Desktop\Class_Material\TY_Own_work\Project-2_WORKING\Flask_review_working\static\datafile\har.geojson
// static\datafile\har.geojson

// Helper function to add commas to List Price popup
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

d3.json(queryUrl).then(data1 => {
    console.log(data1);
});


// Perform a GET request to the queryURL
d3.json(queryUrl).then(data => {

    // Sending our homes layer to the createMap function
    createMap();

    function createMap() {

        // Define streetmap and lightmap layers
        let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
        });

        let lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "light-v10",
            accessToken: API_KEY
        });

        // Define a baseMaps object to hold our base layers
        let baseMaps = {
            "Street Map": streetmap,
            "Light Map": lightmap
        };

        //Attribution of basic icon: "https://www.flaticon.com/authors/becris" 
        // Custom markers for home location
        var homeIcon = L.icon({
            iconUrl: '../static/Images/home.PNG',

            iconSize: [15, 15], // size of the icon
            iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });

        var purpleIcon = L.icon({
            iconUrl: '../static/Images/purple.jpeg',

            iconSize: [15, 15], // size of the icon
            iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });

        var blueIcon = L.icon({
            iconUrl: '../static/Images/blue.jpeg',

            iconSize: [15, 15], // size of the icon
            iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });

        var greenIcon = L.icon({
            iconUrl: '../static/Images/green.jpeg',

            iconSize: [15, 15], // size of the icon
            iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });

        var yellowIcon = L.icon({
            iconUrl: '../static/Images/yellow.jpeg',

            iconSize: [15, 15], // size of the icon
            iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });

        var pinkIcon = L.icon({
            iconUrl: '../static/Images/pink.jpeg',

            iconSize: [15, 15], // size of the icon
            iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });


        // Create an object to keep track of active layers and each layer with its markers
        const layers = {
            active: [],
            one: new L.LayerGroup(),
            two: new L.LayerGroup(),
            three: new L.LayerGroup(),
            four: new L.LayerGroup(),
            five: new L.LayerGroup(),
            six: new L.LayerGroup()
        };


        // Initialize all of the LayerGroups
        layers.one = L.geoJson(data, {
            filter: function (feature, layer) {
                return (feature.properties.list_price <= 250000);
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: purpleIcon });
            },

            // Creates popup
            onEachFeature: function (feature, layer) {
                // console.log(layer)  // To test for function operation
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.total_baths + ' baths' + ' / ' +
                    'MLS# ' + feature.properties.mls +
                    '</p>')
            }
        })

        layers.two = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.list_price >= 250000 &&
                    feature.properties.list_price <= 500000
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: blueIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.total_baths + ' baths' + ' / ' +
                    'MLS# ' + feature.properties.mls +
                    '</p>')
            }
        })

        layers.three = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.list_price >= 500000 &&
                    feature.properties.list_price <= 750000
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: greenIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.total_baths + ' baths' + ' / ' +
                    'MLS# ' + feature.properties.mls +
                    '</p>')
            }
        })

        layers.four = L.geoJson(data, {
            filter: function (feature, layer) {
                return (
                    feature.properties.list_price >= 750000 &&
                    feature.properties.list_price <= 1000000
                )
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: yellowIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.total_baths + ' baths' + ' / ' +
                    'MLS# ' + feature.properties.mls +
                    '</p>')
            }
        })

        layers.five = L.geoJson(data, {
            filter: function (feature, layer) {
                return (feature.properties.list_price >= 1000000);
            },

            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: pinkIcon });
            },

            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<h3>' +
                    feature.properties.full_address +
                    '</h3><hr><p>' +
                    '$' +
                    numberWithCommas(feature.properties.list_price) + ' / ' +
                    feature.properties.bedrooms + ' bedrooms' + ' / ' +
                    feature.properties.total_baths + ' baths' + ' / ' +
                    'MLS# ' + feature.properties.mls +
                    '</p>')
            }
        })

        // School Rating Legend
        var legend = L.control({ position: "topright" });

        legend.onAdd = function (map) {
            var div = L.DomUtil.create("div", "legend");
            div.innerHTML += "<h5>School Rating</h5>";
            // div.innerHTML += "<img src='Images/A.jpg' width = 35 /> <span></span><br>";
            // div.innerHTML += "<img src='Images/B.jpg' width = 35 /> <span></span><br>";
            // div.innerHTML += "<img src='Images/C.jpg' width = 35 /> <span></span><br>";
            // div.innerHTML += "<img src='Images/D.jpg' width = 35 /> <span></span><br>";
            // div.innerHTML += "<img src='Images/F.jpg' width = 35 /> <span></span>";
            div.innerHTML += '<i class="icon" style="background-image: url(../static/Images/A.jpg);background-repeat: no-repeat;"></i><span>"A" rating</span><br>';
            div.innerHTML += '<i class="icon" style="background-image: url(../static/Images/B.jpg);background-repeat: no-repeat;"></i><span>"B" rating</span><br>';
            div.innerHTML += '<i class="icon" style="background-image: url(../static/Images/C.jpg);background-repeat: no-repeat;"></i><span>"C" rating</span><br>';
            div.innerHTML += '<i class="icon" style="background-image: url(../static/Images/D.jpg);background-repeat: no-repeat;"></i><span>"D" rating</span><br>';
            div.innerHTML += '<i class="icon" style="background-image: url(../static/Images/F.jpg);background-repeat: no-repeat;"></i><span>"F" rating</span><br>';
            div.innerHTML += "<h6>Data: TEA.gov</h6>";
            return div;
        };


        // Perform a GET request to the queryURL  
        d3.json(queryUrl).then(schooldata => {

            // Sending our school layer to the schoolMap function
            schoolMap();
            mapme();

            function schoolMap() {

                // Declare and define circle markers for school rating
                let circleStyle = {};
                circleStyle.A = {
                    color: "green",
                    fillColor: "lightgreen",
                    fillOpacity: 0.2,
                    radius: 250,
                    weight: 0
                };
                circleStyle.B = {
                    color: "blue",
                    fillColor: "lightblue",
                    fillOpacity: 0.3,
                    radius: 250,
                    weight: 0
                };
                circleStyle.C = {
                    color: "yellow",
                    fillColor: "yellow",
                    fillOpacity: 0.2,
                    radius: 250,
                    weight: 0
                };
                circleStyle.D = {
                    color: "pink",
                    fillColor: "pink",
                    fillOpacity: 0.2,
                    radius: 250,
                    weight: 0
                };
                circleStyle.F = {
                    color: "red",
                    fillColor: "red",
                    fillOpacity: 0.2,
                    radius: 250,
                    weight: 0
                };


                // School Quality layer - mimics a heatmap based on school rating
                layers.six = L.geoJson(schooldata, {

                    // call "features" of geojson file
                    filter: function (feature, layer) {
                        return schooldata.features;
                    },

                    pointToLayer: function (feature, latlng) {
                        let rating = feature.properties.rating;
                        return L.circle(latlng, circleStyle[rating]); // Returning circlestyle based on letter
                    },

                })
            }
        });


        function mapme() {

            // Create an overlays object to add to the layer control
            let overlayMaps = {
                "<img src='../static/Images/purple.jpeg' width = 15 /> <span>Up to $250K</span>": layers.one,
                "<img src='../static/Images/blue.jpeg' width = 15 /> <span>$250K - $500K</span>": layers.two,
                "<img src='../static/Images/green.jpeg' width = 15 /> <span>$500K - $750K</span>": layers.three,
                "<img src='../static/Images/yellow.jpeg' width = 15 /> <span>$750K - $1M</span>": layers.four,
                "<img src='../static/Images/pink.jpeg' width = 15 /> <span>$1M+</span>": layers.five,
                "School Quality": layers.six
            };

            // Create our map, giving it the streetmap and homes layers to display on load
            let myMap = L.map("map", {
                center: [
                    29.7389278, -95.3651312
                ],
                zoom: 13,
                layers: [
                    streetmap,
                    layers.one,
                    layers.two,
                    layers.three,
                    layers.four,
                    layers.five
                ]
            });

            // Create a layer control
            // Pass in our baseMaps and overlayMaps
            // Add the layer control to the map
            L.control.layers(baseMaps, overlayMaps, {
                collapsed: false
            }).addTo(myMap);

            // Creating scale control and adding scale to map
            L.control.scale(position = 'topleft').addTo(myMap);

            legend.addTo(myMap);

        } // End mapme function
    };
});


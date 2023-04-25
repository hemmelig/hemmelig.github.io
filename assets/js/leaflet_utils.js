function add_basemap(id, latitude, longitude, zoom_level) {
    var map = L.map('map-' + id).setView([latitude, longitude], zoom_level);

    var baseMaps = {
        "ArcGIS Basemap": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
    }
    
    baseMaps["ArcGIS Basemap"].addTo(map);

    return map;
}

function add_station_layer(map, station_file, marker_size) {
    $.getJSON(station_file, function (data) {

        var stations = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    `
                    <div class="map-data" style="padding: 4px 6px; font-size: 0.2rem; background-color: white;">
                        <p align="center"><b>${feature.properties.Network}.${feature.properties.Station}</b></p>
                    </div>
                    `
                );
            },
            pointToLayer: function (feature, latlng) {
                return L.shapeMarker(latlng, {
                    shape: 'diamond',
                    color: '#111',
                    fillColor: '#c994c7',
                    fillOpacity: 1.,
                    radius: marker_size,
                    alt: feature.properties.Station
                });
            }
        });
        map.addLayer(stations);
    });
}

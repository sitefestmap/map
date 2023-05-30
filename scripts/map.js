import mapboxgl from 'mapbox-gl';
// 'mapbox/mapbox-gl-directions' in head to prevent new dep conflict erro
 
import multi_polygon from '../data/multipolygon.js';
import studios from '../data/studios.js';
import studio_markers from '../data/studio-markers.js';
import routes from '../data/routes.js';
import styles from '../styles/styles.js';
 
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhpYXN3ZXN0b24iLCJhIjoiY2xlNHIya255MDJqaTNwbXY5NjUzdWgzYSJ9.af8OJ3gOuIiOvKkYllihGQ';

const bounds = [
    [-2.325, 51.6875], // bottom left coordinates
    [-2.10000, 51.7900]  // top right coordinates
];

const zoom = 11.5;
const center = [-2.181235, 51.736333]

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/matthiasweston/clhuty4u3020p01r0f1wb6lwo',
    center: center,
    zoom: zoom,
   // maxBounds: bounds,
   // scrollZoom: true
});

// Set the map bounds
map.fitBounds(bounds, {
    padding: 0 // Specify padding in pixels to add around the bounds
});
 
// @note Directions API : request up to 25 waypoints only
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            // max zoom
            enableHighAccuracy: false
        },
        fitBoundsOptions: {
            maxZoom: zoom // edit this
        },
        trackUserLocation: true,
        showUserHeading: true
    }),
    'top-left',
);

const filterGroup = document.getElementById('filter-group');

studio_markers.forEach(({studio, color, lngLat}) => {
    const popup = new mapboxgl.Popup({ offset: 25, className: 'sitefest-popup'}).setHTML(studio)

    new mapboxgl.Marker({
        color: color,
        scale: 0.8
    })
    .setLngLat(lngLat)
    .setPopup(popup)
    .addTo(map)
    // add Listeners for hover?
})

map.on('load', () => {
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    const directions =
        new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            // steps: true,
            // banner_instructions: true,
            profile: 'mapbox/cycling',
            alternatives: false,
            controls: {
                instructions: false,
                inputs: false,
            },
            interactive: false,
            styles: styles
        });

    map.addControl(directions,
        'top-left'
    );

    navigator.geolocation.getCurrentPosition(function(position) {
        var userLongitude = position.coords.longitude;
        var userLatitude = position.coords.latitude;
        directions.setOrigin([userLongitude, userLatitude]);
        directions.setDestination([userLongitude, userLatitude]);
    })

    map.addSource('multi_polygon', {
        type: 'geojson',
        data: multi_polygon
    });

    multi_polygon.features.forEach((feature) => {
        const layerID = `polygon-${feature.properties.color}`
        map.addLayer({
        id: layerID,
        type: 'fill',
        source: 'multi_polygon',
        paint: {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.1
        },
        layout: {}
        });
    });

    map.addLayer({
        'id': 'poly-outline',
        'type': 'line',
        'source': 'multi_polygon',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 2
        }
    });

    map.addSource('routes', {
        'type': 'geojson',
        'data': routes
    });
    map.addLayer({
        'id': 'routes',
        'type': 'symbol',
        'source': 'routes',
        'layout': {
            // 'icon-image': ['get', 'icon'],
            // 'icon-size': 1.1,
            'text-field': ['get', 'title'],
            'icon-allow-overlap': true,
            'text-allow-overlap': true,
            'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 0.5],
            'text-anchor': 'top',
            'text-size': 22
        },
        'paint': {
            'text-color': ['get', 'color']
        }
    });

    map.addSource('studios', {
        'type': 'geojson',
        'data': studios
    });

    for (const feature of studios.features) {
        const symbol = feature.properties.icon;
        const waypoint = feature.geometry.coordinates;
        const layerID = `poi-${symbol}`;

        if (!map.getLayer(layerID)) {
            map.addLayer({
                'id': layerID,
                'type': 'symbol',
                'source': 'studios',
                'layout': {
                    'icon-image': `${symbol}`,
                    'icon-size': 0.9,
                    'icon-allow-overlap': true,
                    'text-allow-overlap': true,
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 0.2],
                    'text-anchor': 'top',
                    'text-size': 17
                },
                'paint': {
                    // 'text-color': ['get', 'color'],
                    'text-color': '#111'
                },
            'filter': ['==', 'icon', symbol]
            });

            map.setLayoutProperty(layerID, 'visibility', 'none');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = layerID;
            input.checked = false;
            filterGroup.appendChild(input);  // class in map project html

            const label = document.createElement('label');
            label.setAttribute('for', layerID);
            label.textContent = symbol;
            filterGroup.appendChild(label);
        
        /*  navigator.geolocation.getCurrentPosition(function(position) {
                var userLongitude = position.coords.longitude;
                var userLatitude = position.coords.latitude;
                directions.setOrigin([userLongitude, userLatitude]);
                directions.setDestination([userLongitude, userLatitude]);
            
            })
            */
            
            directions.on('route', function() {
                var routeColor = '#ff6868';
                var routeOutlineColor = '#111';
                map.setPaintProperty('directions-route-line', 'line-color', routeColor, 'line-width', 8);
                map.setPaintProperty('directions-route-line-alt', 'line-color', routeOutlineColor);                
            });

            input.addEventListener('change', (e) => {
                if (e.target.checked) {
                map.setLayoutProperty(layerID, 'visibility', 'visible');
                directions.addWaypoint(0, waypoint);
                } else {
                map.setLayoutProperty(layerID, 'visibility', 'none')
                directions.removeWaypoint(0);
                }
            })
        }
    }
});
import mapboxgl from 'mapbox-gl';
// 'mapbox/mapbox-gl-directions' in head to prevent new dep conflict erro
 
import multi_polygon from '../data/multipolygon.js';
import studios from '../data/studios.js';
import studio_markers from '../data/studio-markers.js';
import routes from '../data/routes.js';
import layerIDsToMatch from '../data/layers-to-match.js';
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
/*
map.fitBounds(bounds, {
    padding: 0
});
*/

// @note Directions API : request up to 25 waypoints only
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            // max zoom
            enableHighAccuracy: false
        },
        fitBoundsOptions: {
            maxZoom: zoom
        },
        trackUserLocation: true,
        showUserHeading: true
    }),
    'top-left',
);

studio_markers.forEach(({studio, color, lngLat}) => {
        const popup = new mapboxgl.Popup({ 
            offset: 25, 
            className: 'sitefest-popup',
            closeButton: false
        }).setHTML(studio)

        new mapboxgl.Marker({
            color: color,
            scale: 0.8
        })
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map);
       
        popup.on('open', () => {
            const popupContainer = document.getElementById('popupcontainer');
            popupContainer.innerHTML = '';
            popupContainer.appendChild(popup.getElement())
        });
})

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false, // Disable the default marker,
        placeholder: 'Find a Studio...',
        localGeocoder: function(query) {
            var results = studios.features.filter(function (studio) {
                return studio.properties.title.toLowerCase().includes(query.toLowerCase());
            });

            return results.map(function (result) {
                return {
                    text: result.properties.title,
                    place_name: result.properties.title,
                    center: result.geometry.coordinates
                };
            });
        },
        // So that we only get back studios and not general map queries
        filter: function (item) {
            return item.context
              .map(function (contextItem) {
                return (
                  contextItem.id.includes('studio') ||
                  contextItem.text.toLowerCase().includes('studio')
                );
              })
              .reduce(function (acc, cur) {
                return acc || cur;
              });
          },
    })
);

map.addControl(new mapboxgl.NavigationControl(), 'top-left');

map.on('load', () => {

    let directions =
        new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            steps: false,
            banner_instructions: false,
            profile: 'mapbox/cycling',
            alternatives: false,
            controls: {
                instructions: false,
                inputs: true,
               profileSwitcher: true
            },
            interactive: false, // prevent user from generating random routes
            styles: styles
        });
     
    navigator.geolocation.getCurrentPosition(function(position) {
        var userLongitude = position.coords.longitude;
        var userLatitude = position.coords.latitude;
        directions.setOrigin([userLongitude, userLatitude]);
        directions.setDestination([userLongitude, userLatitude]);
    })
    map.addControl(directions, 'top-left');

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

    const cookies = document.cookie.split(';');
    const cookieValues = {};

    for (const layerID of layerIDsToMatch) {
        const latestCookie = cookies
            .map(cookie => cookie.trim().split('='))
            .find(([name]) => name === layerID);
        
        if (latestCookie) {
            cookieValues[layerID] = latestCookie[1];
        }
    }
    
    for(const feature of studios.features) {
        const symbol = feature.properties.title;
        const layerID = `${symbol}`;
        if (layerIDsToMatch.includes(layerID)) {
            const waypoint = feature.geometry.coordinates;
            const cookieValue = cookieValues[layerID];

            if (cookieValue === 'true') {
                const sourceExists = map.getSource(layerID) !== undefined;
                const layerExists = map.getLayer(layerID) !== undefined;

                if (!sourceExists) {
                    map.addSource(layerID, {
                        type: 'geojson',
                        data: studios
                    });
                }

                if (!layerExists) {
                    map.addLayer({
                        'id': layerID,
                        'type': 'symbol',
                        'source': 'studios',
                        'layout': {
                            'icon-image': 'light',
                            'icon-size': 1.1,
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
                            'text-color': '#111'
                        },
                    'filter': ['==', 'title', symbol]
                    });

                    map.setLayoutProperty(layerID, 'visibility', 'visible');
                    directions.addWaypoint(0, waypoint);

                    directions.on('route', function() {
                        var routeColor = '#ff6868';
                        var routeOutlineColor = '#111';
                        map.setPaintProperty('directions-route-line', 'line-color', routeColor, 'line-width', 8);
                        map.setPaintProperty('directions-route-line-alt', 'line-color', routeOutlineColor);                
                    });
                } 
                else {
                    map.removeLayer(layerID);
                    map.removeSource(layerID);
                }
            }
        }
    }
});
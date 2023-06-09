/**
 * @todo
 * Tidy this shit up
 */

import mapboxgl from 'mapbox-gl';
// 'mapbox/mapbox-gl-directions' in head to prevent new dep conflict erro
import multi_polygon from '../data/multipolygon.js';
import studios from '../data/studios.js';
import studio_markers from '../data/studio-markers.js';
import routes from '../data/routes.js';
import layerIDsToMatch from '../data/layers-to-match.js';
import styles from '../styles/styles.js';
 import prefsAlert from './prefs-alert';
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhpYXN3ZXN0b24iLCJhIjoiY2xlNHIya255MDJqaTNwbXY5NjUzdWgzYSJ9.af8OJ3gOuIiOvKkYllihGQ';


/*
const bounds = [
    [-2.325, 51.6875], // bottom left coordinates
    [-2.10000, 51.7900]  // top right coordinates
];
*/

const zoom = 11.5;
const center = [-2.181235, 51.736333]

const map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/matthiasweston/clhuty4u3020p01r0f1wb6lwo',
    // style: 'mapbox://styles/matthiasweston/clif391kp006301qv9ont5ij8',
    //style: '/data/skins/frank-satellite/style.json',
   
   // style: 'mapbox://styles/matthiasweston/clif391kp006301qv9ont5ij8', // frank/satellite
   // frank style: 'mapbox://styles/matthiasweston/cliookrjf000r01qvabm8h97i',
   // standard
   style: 'mapbox://styles/matthiasweston/cliookrjf000r01qvabm8h97i',
    center: center,
    zoom: zoom,
    // maxZoom: zoom
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
            enableHighAccuracy: true
        },
        /*  fitBoundsOptions: {
              maxZoom: zoom
          }, */
        trackUserLocation: false,
        showUserHeading: true
    }),
    'top-left',
);

/* Static layer of studio markers and popups, data object imported from studio-markers.js */
studio_markers.forEach(({ studio, color, lngLat }) => {
    const popup = new mapboxgl.Popup({
        offset: 25,
        className: 'sitefest-popup',
        closeButton: true
    }).setHTML(studio)

    new mapboxgl.Marker({
        color: color,
        scale: 0.8
    })
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map);

    // move the popup template literal html content to popupcontainer element
  /*  popup.on('open', () => {
        const popupContainer = document.getElementById('checkbox');
        popupContainer.innerHTML = '';
        popupContainer.appendChild(popup.getElement())
    }); */
})

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false, // We already have a marker
        placeholder: 'Find a Studio...',

        // Search Box : filter each feature.properties.title from the object in /data/studios.js
        localGeocoder: function (query) {
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

  
        prefsAlert()
  

    let directions =
        new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            steps: false,
            banner_instructions: false,
            profile: 'mapbox/driving',
            alternatives: false,
            controls: {
                instructions: false,
                inputs: true,
                profileSwitcher: true
            },
            interactive: false, // prevent user from generating random routes
            styles: styles
        });

    navigator.geolocation.getCurrentPosition(function (position) {
        var userLongitude = position.coords.longitude;
        var userLatitude = position.coords.latitude;
        // directions.setOrigin([userLongitude, userLatitude]);
        directions.setOrigin([-2.2167788, 51.7445037]); // set center for map component refresh
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

    // wrap in a function to call later for popups
    for (const feature of studios.features) {
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

                    directions.on('route', function () {
                        var routeColor = '#ffffff';
                        var routeOutlineColor = '#111';
                        map.setPaintProperty('directions-route-line', 'line-color', routeColor, 'line-width', 8);
                        map.setPaintProperty('directions-route-line-alt', 'line-color', routeOutlineColor);

                        // for error: added {'id': 'directions-route-line-outline'}, styles.js line 19
                    });
                }
                else {
                    map.removeLayer(layerID);
                    map.removeSource(layerID);

                }
            }
        }
    }

    //function popupCookies() {

    // Modified version of Lukes main.js cookies code for the map page
    // instead of all static checkboxes, one enters the DOM at a time in a popup

    // Function to retrieve the state of the checkbox
    // Needs to be available Globally
    function getPopupCheckboxState(checkboxValue) {
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(";");

        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(checkboxValue) === 0) {
                var state = cookie.substring(checkboxValue.length + 1);
                return state === "true";
            }
        }
        return false;
    }

    //document.addEventListener("DOMContentLoaded", function () {

    // Output all cookies and their states to the console
    console.log("All cookies:", document.cookie);

    // On click, the popup content is loaded into the popupcontainer id element
    const popupContainer = document.getElementById('map');

    // Mutation Observer to listen for id checkbox being added, and then run the code to get initial checkbox state
    // Select the target node (popupcontainer) and the options for the observer
    const targetNode = popupContainer;
    const observerOptions = {
        childList: true, // Observe direct child nodes
        subtree: true, // Observe all descendants
    };

    // Create a new MutationObserver instance
    const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.querySelector && node.querySelector('#checkbox')) {
                        console.log('Checkbox element entered the document');
                        // getPopupCheckboxState(checkboxValue);
                        var checkboxValue = checkbox.value; // John St Studios
                        var checkboxName = checkboxValue;
                        var checkboxState = getPopupCheckboxState(checkboxValue);
                        checkbox.checked = checkboxState;
                        const mapStatusLabel = document.querySelector('.mapStatusLabel');
                        const customCheckmark = document.querySelector('.custom-checkmark');

                        if (mapStatusLabel) {
                            mapStatusLabel.textContent = checkboxState ? 'Added to Your Map' : 'Add to Your Map';
                        }

                        if (customCheckmark) {
                            if (checkboxState) {
                                customCheckmark.classList.add('checked');
                            } else {
                                customCheckmark.classList.remove('checked');
                            }
                        }
                    }
                });
            }
        }
    });
    // Start observing the target node
    observer.observe(targetNode, observerOptions);

    console.log('Observer initialized')

    // Run the same cookie code as main page but for the popup checkbox
    popupContainer.addEventListener('click', function (event) {
        if (event.target.id === 'checkbox') {

            // Note: 'studio-markers.js' inputs have an added id="checkbox", as only one of them appears in the DOM at a time
            var checkbox = event.target;

            // Add event listener to the checkbox
            createPopupCheckboxClickListener(checkbox)();

            // Logging the state of the checkbox
            console.log(checkbox.checked); // true or false
            console.log('Found the popup checkbox');
            console.log("All cookies:", document.cookie);
        }
    });

    // Function to create the event listener the checkbox
    function createPopupCheckboxClickListener(checkbox) {
        return function () {
            // Get the checkbox value (e.g., nutshell, article, high-st)
            var checkboxValue = checkbox.value; // studio / layer name
            var checkboxState = checkbox.checked; // any state of the checkbox

            // Set the checkbox state as a cookie with true/false value and expiration date
            var expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Set expiration to 1 year from now
            document.cookie = checkboxValue + "=" + checkbox.checked + "; expires=" + expirationDate.toUTCString();

            // Get the state of the created cookie
            var cookieState = getPopupCheckboxState(checkboxValue);

            // Output the name and state of the created cookie to the console
            console.log("Created cookie: " + checkboxValue + " (State: " + cookieState + ")");

            // Output all cookies and their states to the console
            // console.log("All cookies:", document.cookie);

            const mapStatusLabel = document.querySelector('.mapStatusLabel');
            // Update the corresponding map status label
            //  var mapStatusLabel = mapStatusLabel;
            if (mapStatusLabel) {
                mapStatusLabel.textContent = checkboxState ? 'Added to Your Map' : 'Add to Your Map';
            }

            // for later adding current checkbox waypoint to index(0)
            // so that correct waypoint is removed
            function coordinateMatch(a, b) {
                if (!a.geometry || !b.geometry) {
                  return false;
                }
              
                const coordinatesA = a.geometry.coordinates;
                const coordinatesB = b.geometry.coordinates;
              
                if (!coordinatesA || !coordinatesB) {
                  return false;
                }
              
                return (
                  coordinatesA[0].toFixed(6) === coordinatesB[0].toFixed(6) &&
                  coordinatesA[1].toFixed(6) === coordinatesB[1].toFixed(6)
                );
              }

            // Add or remove the corresponding source and layer based on the checkbox state
            if (checkboxState) {
                const sourceExists = map.getSource(checkboxValue) !== undefined;
                const layerExists = map.getLayer(checkboxValue) !== undefined;

                if (!sourceExists) {
                    map.addSource(checkboxValue, {
                        type: 'geojson',
                        data: studios
                    });
                }

                if (!layerExists) {
                    map.addLayer({
                        'id': checkboxValue,
                        'type': 'symbol',
                        'source': checkboxValue,
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
                        'filter': ['==', 'title', checkboxValue]
                    });

                    map.setLayoutProperty(checkboxValue, 'visibility', 'visible');

                    const waypointName = studios.features.find(feature => feature.properties.title === checkboxValue)?.properties.title || '';

                    // Get the coordinates for the added layer
                    const layerCoordinates = studios.features.find(feature => feature.properties.title === checkboxValue).geometry.coordinates;
                    const waypoint = {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: layerCoordinates
                        }
                    };

                    directions.addWaypoint(0, waypoint);
                    console.log('Added waypoint at index 0:', waypointName);

                    directions.on('route', function () {
                        var routeColor = '#ffffff';
                        var routeOutlineColor = '#111';
                        map.setPaintProperty('directions-route-line', 'line-color', routeColor, 'line-width', 8);
                        map.setPaintProperty('directions-route-line-alt', 'line-color', routeOutlineColor);
                    });

                    const customCheckmark = checkbox.parentElement.querySelector('.custom-checkmark');
                    if (customCheckmark) {
                        if (checkboxState) {
                            customCheckmark.classList.add('checked');
                        } else {
                            customCheckmark.classList.remove('checked');
                        }
                    }
                }
            } else {
                console.log("Removing layer and source:", checkboxValue);
                map.removeLayer(checkboxValue);
                map.removeSource(checkboxValue);
                // directions.removeWaypoint(0) // wrong

                

                // retrieve the coordinates property from the geometry of the feature that has a title property matching the checkboxValue. 
                // It assigns the coordinates to the waypoint variable
                
                // const layerCoordinates = studios.features.find(feature => feature.properties.title === checkboxValue).geometry.coordinates;
                const waypoint = studios.features.find(feature => feature.properties.title === checkboxValue)?.geometry.coordinates;

                if (waypoint) {
                    // Use the layerCoordinates in further operations
                    console.log('Layer coordinates:', waypoint, 'for', checkboxValue);
                } else {
                    console.log('Coordinates not found for:', checkboxValue);
                }

                if (waypoint) {
                    const waypoints = directions.getWaypoints();
                    const waypointToRemove = waypoints.find(wp => coordinateMatch(wp, { geometry: { coordinates: waypoint } }));
                
                    // doesn't work without console logs?
                   // if (waypointToRemove) {
                     //   const waypointIndex = waypoints.indexOf(waypointToRemove);
                       // const removedWaypoint = directions.removeWaypoint(waypointIndex);
                       // console.log('Removed waypoint:', waypoint, removedWaypoint);
                    if (waypointToRemove) {
                        const waypointIndex = waypoints.indexOf(waypointToRemove);
                        directions.removeWaypoint(waypointIndex);
                        console.log('Removed waypoint:', waypoint);
                       
                    } else {
                        console.log('Waypoint not found:', waypoint);
                    }
                }

                const customCheckmark = checkbox.parentElement.querySelector('.custom-checkmark');
                if (customCheckmark) {
                    if (checkboxState) {
                        customCheckmark.classList.add('checked');
                    } else {
                        customCheckmark.classList.remove('checked');
                    }
                } 
            }
        }
    }
});


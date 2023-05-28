const john_st = [-2.22, 51.745];
const vale = [-2.268437, 51.768535];
const bisley = [-2.16, 51.755];
const slad = [-2.198, 51.772];
const golden_valley = [-2.185, 51.728];
const nailsworth = [-2.25, 51.726];

const dark_red = '#991f07';
const dark_blue = '#264a72';
const dark_orange = '#924806';
const dark_purple = '#371998';
const dark_green = '#0a6937';
const dark_mid_blue = '#142fa4'

const routes = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": john_st
            },
            "properties": {
                "title": "Stroud",
                "icon" : "",
                "color": dark_red
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": vale
            },
            "properties": {
                "title": "Valley and Vale",
                "icon" : "",
                "color": dark_blue
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": bisley
            },
            "properties": {
                "title": "Bisley",
                "icon" : "",
                "color": dark_purple
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": slad
            },
            "properties": {
                "title": "Slad Valley",
                "icon" : "",
                "color": dark_orange
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": golden_valley
            },
            "properties": {
                "title": "Golden Valley",
                "icon" : "",
                "color": dark_green
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": nailsworth
            },
            "properties": {
                "title": "Nailsworth Valley",
                "icon" : "",
                "color": dark_mid_blue
            }
        }
    ]
}

export default routes;
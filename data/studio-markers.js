import * as waypoints from './waypoints';

// Marker colors
const red       = `hsl(10  70% 50%)`;
const mid_blue  = `hsl(195 70% 50%)`;
const dark_blue = `hsl(215 70% 50%)`;
const orange    = `hsl(30  70% 50%)`;
const purple    = `hsl(280 70% 50%)`;
const green     = `hsl(150 70% 50%)`;

const studio_markers = [
    // Route 1 Town Centre (Red)
    {
        studio: `<h2>John St Studios</h2>
        <p>...more info</p>`,
        color: red,
        lngLat: waypoints.john_st
    },
    {
        studio: `<h2>Weven</h2>
        <p>...more info</p>`,
        color: red,
        lngLat: waypoints.weven
    },
    {
        studio: `<h2>Cacao Circle</h2>
        <p>...more info</p>`,
        color: red,
        lngLat: waypoints.cacao_circle
    },
    {
        studio: `<h2>High St</h2>
        <p>...more info</p>`,
        color: red,
        lngLat: waypoints.high_st
    },
    // Route 2 Nailsworth (Mid blue)
    {
        studio: `<h2>Bath Road</h2>
        <p>...more info</p>`,
        color: mid_blue,
        lngLat: waypoints.bath_rd
    },
    {
        studio: `<h2>Marven St Chloe</h2>
        <p>...more info</p>`,
        color: mid_blue,
        lngLat: waypoints.marven_st_chloe
    },
    {
        studio: `<h2>Frogmarsh Mill</h2>
        <p>...more info</p>`,
        color: mid_blue,
        lngLat: waypoints.frogmarsh_mill
    },
    {
        studio: `<h2>Article Studio</h2>
        <p>...more info</p>`,
        color: mid_blue,
        lngLat: waypoints.article_studio
    },
    {
        studio: `<h2>The Hide</h2>
        <p>...more info</p>`,
        color: mid_blue,
        lngLat: waypoints.the_hide
    },
    {
        studio: `<h2>The Nutshell Studios</h2>
        <p>...more info</p>`,
        color: mid_blue,
        lngLat: waypoints.nutshell_studios
    },
    {
        studio: `<h2>Three Storeys</h2>
        <p>...more info</p>`,
        color: mid_blue,
        lngLat: waypoints.three_storeys
    },
    // Route 3 VALE (BLUE)
    {
        studio: `<h2>Walled Garden Pop Up Studio</h2>
        <p>...more info</p>`,
        color: dark_blue,
        lngLat: waypoints.walled_garden
    },
    {
        studio: `<h2>Studio Tuft</h2>
        <p>...more info</p>`,
        color: dark_blue,
        lngLat: waypoints.studio_tuft
    },
    // Route 4
    {
        studio: `<h2>Houseworkwork</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.houseworkwork
    },
    {
        studio: `<h2>Landsdown Hall</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.landsdown_hall
    },
    {
        studio: `<h2>Jack Duplock</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.jack_duplock
    },
    {
        studio: `<h2>Stroud Pottery</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.stroud_pottery
    },
    {   
        studio: `<h2>May Derbyshire</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.may_derbyshire
    },
    {   // combine into 1?
        studio: `<h2>Mark Derbyshire</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.mark_derbyshire
    },
    {
        studio: `<h2>Lucy Inder</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.lucy_inder
    },
    {
        studio: `<h2>Sam Marsh</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.sam_marsh
    },
    {
        studio: `<h2>Andy Bradley</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.andy_bradley
    },
    {
        studio: `<h2>Hawkwood</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.hawkwood
    },
    {
        studio: `<h2>The Camp</h2>
        <p>...more info</p>`,
        color: orange,
        lngLat: waypoints.the_camp
    },
    // Route 5
    {
        studio: `<h2>Studio 3</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.studio_3
    },
    {
        studio: `<h2>Melvyn Warren-Smith</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.melvyn_warren_smith
    },
    {
        studio: `<h2>Kath Williams</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.kath_williams
    },
    {
        studio: `<h2>Piccadilly Mill East</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.piccadilly_mill_east
    },
    {
        studio: `<h2>Piccadilly Mill West</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.piccadilly_mill_west
    },
    {
        studio: `<h2>Lower St</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.lower_st
    },
    {
        studio: `<h2>Nigel Noyes</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.nigel_noyes
    },
    {
        studio: `<h2>Clare Bonnet</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.clare_bonnet
    },
    {
        studio: `<h2>Caroline Jamfrey</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.caroline_jamfrey
    },
    /*{
        studio: `<h2>Horns Rd</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.horns_rd
    }, */

    {
        studio: `<h2>Robert Garland</h2>
        <p>...more info</p>`,
        color: purple,
        lngLat: waypoints.robert_garland
    },
    // Route 6 Golden Valley (Green)
    {
        studio: `<h2>Trixter Studios</h2>
        <p>...more info</p>`,
        color: green,
        lngLat: waypoints.trickster_house
    },
  /*  {
        studio: `<h2>London Road</h2>
        <p>...more info</p>`,
        color: green,
        lngLat: waypoints.london_rd
    },
    */
    {
        studio: `<h2>Griffin Mill</h2>
        <p>...more info</p>`,
        color: green,
        lngLat: waypoints.griffin_mill
    },
    {
        studio: `<h2>Polly Lyster</h2>
        <p>...more info</p>`,
        color: green,
        lngLat: waypoints.polly_lyster
    },
    {
        studio: `<h2>Victoria Works</h2>
        <p>...more info</p>`, // London Road
        color: green,
        lngLat: waypoints.victoria_works
    },
    {
        studio: `<h2>Sarah Maingot</h2>
        <p>...more info</p>`, // London Road
        color: green,
        lngLat: waypoints.sarah_maingot
    },
]

export default studio_markers;
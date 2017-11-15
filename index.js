var drawNewTree = require('./js/drawNewTree')
var state = require('./js/initialState')
var sliders = require('./js/sliders')

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// if(window.innerWidth < 500){ canvas.height = window.innerHeight - 200; }

sliders.setup(canvas, state) // set up sliders and listeners on them

drawNewTree(canvas, state);


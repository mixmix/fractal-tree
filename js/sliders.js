var noUiSlider = require('nouislider')

var drawNewTree = require('./drawNewTree')

var sliders 

function setup(canvas, state){
  sliders = document.getElementsByClassName('sliders');

  noUiSlider.create(sliders["repeats"], {
    start: 6, tooltips: true, step: 1, range: { 'min': 1, 'max': 12 }
  });
  noUiSlider.create(sliders["depth"], {
    start: 5, tooltips: true, step: 1, range: { 'min': 1, 'max': 20 }
  });
  noUiSlider.create(sliders["offset"], {
    start: 25, tooltips: true, step: 1, range: { 'min': 0, 'max': 180 }
  });
  noUiSlider.create(sliders["size"], {
    start: 12, tooltips: true, step: 1, range: { 'min': 0, 'max': 25 }
  });
  noUiSlider.create(sliders["skew"], {
    start: 0, tooltips: true, step: 1, range: { 'min': [-90], 'max': [90] }
  });
  noUiSlider.create(sliders["opacity"], {
    start: 1, tooltips: true, step: 0.025, range: { 'min': 0, 'max': 1 }
  });

  for ( var i = 0; i < sliders.length; i++ ) {
    sliders[i].noUiSlider.on('slide', e => drawTreeFromSliders(canvas, state));
  }
}

function drawTreeFromSliders(canvas, state){
  var size = sliders["size"].noUiSlider.get()

  state = Object.assign({}, state, {
    repeats: Number(sliders["repeats"].noUiSlider.get()),
    depth: sliders["depth"].noUiSlider.get(),
    offset: Number(sliders["offset"].noUiSlider.get()),
    size: size,
    height: size,
    width: size,
    skew: Number(sliders["skew"].noUiSlider.get()),
  })

  // TODO - re-enable these
  // context.globalAlpha = Number(sliders["opacity"].noUiSlider.get());
  // context.strokeStyle = rgbaColor;
  drawNewTree(canvas, state);
}

module.exports = {
  setup,
  drawTreeFromSliders
}

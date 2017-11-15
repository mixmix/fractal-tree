var deg_to_rad = Math.PI / 180.0;
var context

function drawNewTree(canvas, state){
  var treeIteration = 0;
  context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);
  // context.fillStyle = 'rgb(255,25,255)';
  context.strokeStyle = 'rgba(255,255,255,1)';
  context.globalAlpha = state.alpha;
  context.lineWidth = 1;

  context.beginPath();
  var center = { x: canvas.width/2, y: canvas.height/2 }
  drawReflectedTrees(center, state, treeIteration);
  context.closePath();
  context.stroke();
}

function drawReflectedTrees(center, state, treeIteration){
  while (state.repeats - treeIteration !== 0) {
    // console.log("repeats: " + repeats + " treeIteration:" + treeIteration)
    drawTree(center, state, treeIteration);
    treeIteration++;
  }
}

function drawTree(center, state, treeIteration){
  var { repeats, angle, depth, width, height, skew, offset } = state
  // equivalent to e.g.
  // var repeats = state.repeats
  var { x: x1, y: y1 } = center
  // equivalent to
  // var x1 = center.x 
  // var y1 = center.y

  var mirrorAngle = treeIteration/repeats * (2 * Math.PI)
  if (depth !== 0){
    var x2 = x1 + (Math.cos(angle * deg_to_rad + mirrorAngle) * depth * width);
    var y2 = y1 + (Math.sin(angle * deg_to_rad + mirrorAngle) * depth * height);
    drawLine(x1, y1, x2, y2);

    var newCenter = { x: x2, y: y2 }
    var newState1 = Object.assign({}, state, { 
      angle: angle + offset + skew,
      depth: depth - 1 
    })
    var newState2 = Object.assign({}, state, { 
      angle: angle - offset,
      depth: depth - 1 
    })
    drawTree(newCenter, newState1, treeIteration)
    drawTree(newCenter, newState2, treeIteration)
  }
}

function drawLine(x1, y1, x2, y2){
  // TODO - get rid of global context var
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
}

module.exports = drawNewTree


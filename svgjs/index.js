var draw;
var animationFrameId;
var bees = [];

var CANVAS_WIDTH = 1440;
var CANVAS_HEIGHT = 799;
var ANIMATION_DURATION = 1000;

window.onload = function() {
	draw = SVG('drawing').size(CANVAS_WIDTH, CANVAS_HEIGHT);
  draw.image('../assets/bg.jpg');
  
  updateBees();
};

function updateBees() {
  removeBees();

  var count = parseInt(document.getElementById('bee-count').value, 10) || 100;

  for (var i = 0; i < count - 1; i++) {
    var bee = draw.image('../assets/bee.svg');
    var xPos = Math.floor(Math.random() * CANVAS_WIDTH);
    var yPos = Math.floor(Math.random() * CANVAS_HEIGHT);
    bee.attr('x', xPos);
    bee.attr('y', yPos);

    bees.push(bee);
  }

  animationFrameId = requestAnimationFrame(animateBees);
}

function removeBees() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  bees.forEach((bee) => {
    bee.remove();
  });

  bees = [];
}

function animateBees() {
  bees.forEach((bee) => {
    var xPos = Math.floor(Math.random() * CANVAS_WIDTH);
    var yPos = Math.floor(Math.random() * CANVAS_HEIGHT);
    bee.animate(ANIMATION_DURATION, '<>').move(xPos, yPos).loop(Infinity, true);
  });
}

var renderer;
var container;
const maxBees = 1000;
var beeCount = 100;
var beeTexture;
var bees = [];
var animationFrameId;
var stage;
const beeSvg = '../assets/bee.svg';

function addBee(randomPos) {
  var bee = new PIXI.Sprite(beeTexture)
  bee.position.x = randomPos ? (Math.random() * width) : mousePos.x
  bee.position.y = randomPos ? (Math.random() * height) : mousePos.y
  bee.speedX = (Math.random() - 0.5) * 10
  bee.speedY = (Math.random() - 0.5) * 10

  bee.accX = (Math.random() - 0.5) * 0.1
  bee.accY = (Math.random() - 0.5) * 0.1

  bee.anchor.y = 0.5
  bee.anchor.x = 0.5
  bee.scale.set(0.5 + Math.random() * 0.5)
  bees.push(bee)
  bee.rotation = (Math.random() - 0.5)
  container.addChild(bee)
  count++
}

function setup() {
  var type = "WebGL"
  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
  }

  renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
    backgroundColor: 0xFFFFFF
  });
  stage = new PIXI.Container(0xFFFFFF)
  // stage.filterArea = new PIXI.Rectangle(250, 250, 500, 500);
  // stage.filters = [new PIXI.filters.BlurFilter()];
  document.body.appendChild(renderer.view);

  isWebGL = renderer instanceof PIXI.WebGLRenderer

  if (!isWebGL) {
    renderer.context.mozImageSmoothingEnabled = false
    renderer.context.webkitImageSmoothingEnabled = false
  }

  /*
   * Fix for iOS GPU issues
   */
  renderer.view.style['transform'] = 'translatez(0)'

  document.body.appendChild(renderer.view)
  renderer.view.style.position = 'absolute'
  beeTexture = new PIXI.Texture.fromImage(beeSvg, undefined, undefined, 1.0)
  container = new PIXI.particles.ParticleContainer(maxBees, [false, true, false, false, false])
  container.filterArea = new PIXI.Rectangle(250, 250, 500, 500);
  container.filters = [new PIXI.filters.BlurFilter()];

  updateBackground(() => {
    stage.addChild(container);
    updateBee();
    setupRect();
  });

  // renderer.render(stage);
  // animationFrameId = requestAnimationFrame(update);
}

function setupRect() {
  var graphics = new PIXI.Graphics();

  // graphics.blendMode = PIXI.BLEND_MODES.OVERLAY;
  graphics.beginFill(0xFFFFFF, 0.5);
  graphics.drawRect(250, 250, 500, 500);
  var filter = new PIXI.filters.BlurFilter();
  graphics.filters = [filter]

  stage.addChild(graphics);
}

function updateBackground(cb) {
  const bgPath = '../assets/bg.jpg';
  if (!PIXI.loader.resources[bgPath]) {
    PIXI.loader
      .add(bgPath)
      .load(() => {
        var bg = new PIXI.Sprite(
          PIXI.loader.resources[bgPath].texture
        );
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;

        stage.addChild(bg);
        cb();
      });
  } else {
    cb();
  }
}

function updateBee() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  const element = document.getElementById('bee-count');
  const count = parseInt(element.value, 10) || 100;

  bees.forEach(bee => container.removeChild(bee));
  bees = Array.apply(null, { length: count }).map((val, i) => {
    var bee = new PIXI.Sprite(beeTexture)
    bee.position.x = (Math.random() * window.innerWidth);
    bee.position.y = Math.random() * window.innerHeight;
    bee.speedX = (Math.random() - 0.5) * 10
    bee.speedY = (Math.random() - 0.5) * 10

    bee.accX = (Math.random() - 0.5) * 0.1
    bee.accY = (Math.random() - 0.5) * 0.1

    bee.anchor.y = 0.5
    bee.anchor.x = 0.5
    bee.scale.set(0.5 + Math.random() * 0.5)
    bees.push(bee)
    bee.rotation = (Math.random() - 0.5)
    container.addChild(bee);
    return bee;
  });

  animationFrameId = requestAnimationFrame(update);
}

function update() {
  bees.forEach(bee => {
    bee.position.x += bee.speedX
    bee.position.y += bee.speedY
    bee.speedX += bee.accX
    bee.speedY += bee.accY
    bee.accX += (Math.random() - 0.5) * 0.01
    bee.accY += (Math.random() - 0.5) * 0.01

    if (bee.position.x > window.innerWidth) {
      bee.speedX *= -1
      bee.position.x = window.innerWidth
    } else if (bee.position.x < 0) {
      bee.speedX *= -1
      bee.position.x = 0
    }

    if (bee.position.y > window.innerHeight) {
      bee.speedY *= -0.85
      bee.position.y = window.innerHeight
      bee.spin = (Math.random() - 0.5) * 0.2
    } else if (bee.position.y < 0) {
      bee.speedY *= -0.85
      bee.position.y = 0
    }
  });
  renderer.render(stage)
  animationFrameId = requestAnimationFrame(update)
}


setup();


window.addEventListener('resize', () => {
  renderer.resize(window.innerWidth, window.innerHeight);
})


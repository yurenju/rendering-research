function toggle() {
  var button = document.querySelector('.toggle');
  var overlay = document.querySelector('.container');
  if (overlay.className === 'container down') {
    overlay.className = 'container up';
    button.innerText = '-';
  } else {
    overlay.className = 'container down';
    button.innerText = '+';
  }
}

var beeCount = 100;


const element = document.getElementById('bee-count');
element.value = beeCount;

function updateBee() {
  const element = document.getElementById('bee-count');
  const count = parseInt(element.value, 10);
  const bees = document.getElementById('bees');
  bees.innerHTML = Array.apply(null, { length: count }).map((val, i) => `<img src="./bee.svg" class="bee" id="bee-${i}" />`).join('');
}

setInterval(() => {
  const bees = Array.from(document.getElementsByClassName('bee'));
  bees.forEach(bee => {
    bee.style.transform = `translate(${parseInt(Math.random() * 1000, 10)}px, ${parseInt(Math.random() * 1000, 10)}px)`;
  })
}, 1000);

updateBee(beeCount);

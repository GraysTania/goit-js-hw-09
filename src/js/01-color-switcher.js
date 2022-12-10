const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

console.log(refs.stop);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.start.addEventListener('click', onClickStart);
refs.stop.addEventListener('click', onClickStop);

function onClickStart(e) {
  refs.start.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    refs.body.style.background = getRandomHexColor();
  }, 1000);
}

function onClickStop(e) {
  clearInterval(timerId);

  refs.start.removeAttribute('disabled');
}

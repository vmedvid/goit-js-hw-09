function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let timerId = null;
let count = 0;

function changeBackgroundColor(el) {
  el.style.backgroundColor = getRandomHexColor();
}

startBtnEl.addEventListener('click', () => {
  count = 0;

  timerId = setInterval(() => {
    changeBackgroundColor(document.body);
    count += 1;
  }, 1000);

  startBtnEl.setAttribute('disabled', true);
});

stopBtnEl.addEventListener('click', () => {
  clearInterval(timerId);

  startBtnEl.removeAttribute('disabled');

  console.log(`Фон змінився ${count} раз(-и,-ів)`);
});

startBtnEl.setAttribute(
  'style',
  'margin: 50px; padding: 20px; width: 150px; font-size: 22px; border-radius: 5px;'
);
stopBtnEl.setAttribute(
  'style',
  'margin: 50px; padding: 20px; width: 150px; font-size: 22px; border-radius: 5px;'
);

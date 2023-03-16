import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'animate.css';

const inputDateEl = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('button[data-start]');
const dataDaysEl = document.querySelector('.value[data-days]');
const dataHoursEl = document.querySelector('.value[data-hours]');
const dataMinutesEl = document.querySelector('.value[data-minutes]');
const dataSecondsEl = document.querySelector('.value[data-seconds]');
startTimerBtn.setAttribute('disabled', true);
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      startTimerBtn.setAttribute('disabled', true);
    } else {
      startTimerBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
      console.log('Вибрана дата:', selectedDate);
    }
  },
};

flatpickr(inputDateEl, options);

let timerId = null;

const timer = targetDate => {
  clearInterval(timerId);

  timerId = setInterval(() => {
    let countdownTime = targetDate - new Date();
    document.querySelector('.timer-end-text')?.remove();
    if (countdownTime < 0) {
      clearInterval(timerId);
      const newString = `<p class="timer-end-text animate__animated animate__zoomIn">WE WON!!!</p>`;
      document
        .querySelector('.timer')
        .insertAdjacentHTML('afterend', newString);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(countdownTime);
    dataDaysEl.innerText = addLeadingZero(days);
    dataHoursEl.innerText = addLeadingZero(hours);
    dataMinutesEl.innerText = addLeadingZero(minutes);
    dataSecondsEl.innerText = addLeadingZero(seconds);
  }, 1000);
};

startTimerBtn.addEventListener('click', () => {
  timer(selectedDate);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const newValue = value.toString();
  if (newValue.length > 2) {
    return newValue;
  }
  return newValue.padStart(2, 0);
}

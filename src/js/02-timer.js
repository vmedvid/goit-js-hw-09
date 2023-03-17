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
const timerEndTextEl = document.querySelector('.timer-end-text');
startTimerBtn.setAttribute('disabled', true);
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      Notify.failure('Please choose a date in the future');
      startTimerBtn.setAttribute('disabled', true);
    } else {
      startTimerBtn.removeAttribute('disabled');
      selectedDate = selectedDates;
      console.log('Вибрана дата:', selectedDates);
    }
  },
};

flatpickr(inputDateEl, options);

let timerId = null;

const timer = targetDate => {
  clearInterval(timerId);

  timerId = setInterval(() => {
    let countdownTime = targetDate - Date.now();

    if (countdownTime < 0) {
      clearInterval(timerId);
      timerEndTextEl.classList.remove('is-hidden');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(countdownTime);

    updateTimer(days, hours, minutes, seconds);
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
  return value.toString().padStart(2, 0);
}

function updateTimer(days, hours, minutes, seconds) {
  dataDaysEl.innerText = addLeadingZero(days);
  dataHoursEl.innerText = addLeadingZero(hours);
  dataMinutesEl.innerText = addLeadingZero(minutes);
  dataSecondsEl.innerText = addLeadingZero(seconds);
}

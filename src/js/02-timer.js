import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
  btnStart: document.querySelector('button[data-start]'),

  divTimer: document.querySelector('.timer'),
  divField: document.querySelectorAll('.field'),

  setDisableBtn() {
    this.btnStart.setAttribute('disabled', 'true');
  },
  isDisableBtn() {
    return !this.btnStart.hasAttribute('disabled');
  },
  setEnableBtn() {
    this.btnStart.removeAttribute('disabled');
  },
};
let passTime = null;
let nextSelectedTime = null;
let intervalId = null;
const TIME_INTERVAL = 1000;
const selector = '#datetime-picker';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    nextSelectedTime = new Date(selectedDates[0]).getTime();
    if (nextSelectedTime < Date.now()) {
      Notify.failure('Please choose a date in the future', { timeout: 3000 });
      nextSelectedTime = null;
      if (refs.isDisableBtn()) {
        refs.setDisableBtn();
      }
      return;
    }

    refs.setEnableBtn();
  },
};

setMarkupStyle();
refs.setDisableBtn();
refs.btnStart.addEventListener('click', onStartTimer);

flatpickr(selector, options);

function onStartTimer() {
  refs.setDisableBtn();
  const selectedTime = nextSelectedTime;

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  intervalId = setInterval(timeLeft, TIME_INTERVAL, selectedTime);
}

function timeLeft(time) {
  passTime = time - Date.now();

  if (passTime < 0) {
    clearInterval(intervalId);
    intervalId = null;
    return;
  }

  showLeftTime(passTime);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showLeftTime(pt) {
  const { days, hours, minutes, seconds } = convertMs(pt);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function setMarkupStyle() {
  refs.divTimer.style.display = 'flex';
  refs.divTimer.style.justifyContent = 'center';

  refs.divField.forEach(el => {
    el.style.marginRight = '30px';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    el.firstElementChild.style.fontSize = '40px';
  });
  refs.divTimer.lastElementChild.style.marginRight = '0px';
}

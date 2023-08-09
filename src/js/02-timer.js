import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputEl = document.querySelector("#datetime-picker")
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
const btnStart = document.querySelector("button");
let selectedDate = null;
let currentDate = null; 
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      selectedDate = selectedDates[0]
      currentDate = new Date()
      if (currentDate < selectedDate) {
        //   future 
          btnStart.disabled = false;
      } else {
          Notify.failure('Please choose a date in the future');
        //   past
      }
    },
  
};

flatpickr(inputEl, options)
btnStart.disabled = true;
btnStart.addEventListener('click', onStartTimer)

function onStartTimer() {
    btnStart.disabled = true;
    timerId = setInterval(() => {
        currentDate = new Date()
        const differenceTime = selectedDate - currentDate;
        if (differenceTime > 0) {
            const convertTime = convertMs(differenceTime)

            daysEl.innerHTML = addLeadingZero(convertTime.days)
            hoursEl.innerHTML = addLeadingZero(convertTime.hours)
            minutesEl.innerHTML = addLeadingZero(convertTime.minutes)
            secondsEl.innerHTML = addLeadingZero(convertTime.seconds)
        } else {
            clearInterval(timerId);
        }
       
  }, 1000);
    
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
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
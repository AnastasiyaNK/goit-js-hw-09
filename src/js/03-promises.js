import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector(".form")
const delayEl = document.querySelector('[name="delay"]')
const stepEl = document.querySelector('[name="step"]')
const amountEl = document.querySelector('[name="amount"]')
const btnPromises = document.querySelector("button")

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res({position, delay});
      } else {
        rej({position, delay});
      }
    })
  }, delay);
}

formEl.addEventListener("click", onClickBtn)

function onClickBtn(e) {
  e.preventDefault();

  let delayInput = Number(delayEl.value);
  let stepInput = Number(stepEl.value);
  let amountInput = Number(amountEl.value);

  for (let i = 1; i <= amountInput; i += 1){
    createPromise(i, delayInput)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delayInput += stepInput;
  }
}




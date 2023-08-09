
const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyColorEl = document.querySelector("body")
let timerId = null;

startBtnEl.addEventListener("click", onClikcStart)
stopBtnEl.addEventListener("click", onClickStop)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function colorRandomEl() {
    const colorEl = getRandomHexColor();
    bodyColorEl.style.backgroundColor = colorEl;
}


function onClikcStart() {
    timerId = setInterval(colorRandomEl,1000)
    
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
    
}

function onClickStop() {
    clearInterval(timerId)
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;

}
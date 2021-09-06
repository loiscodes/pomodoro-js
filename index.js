const MINUTE_ERROR = "Time is not valid";

// Elements
const counterDisplayElement = document.getElementById("counterDisplay");
const minuteInputElement = document.getElementById("minuteInput");
const startStopBtnElement = document.getElementById("startStopBtn");
const resetBtnElement = document.getElementById("resetBtn");
const addPomodoroBtnElement = document.getElementById("addPomodoroTimeBtn");
const listOfPomodoroTimersElement = document.querySelector(".listOfPomodoroTimers");
// let vars
let countDownCounter = 0;
let hasPomodoroStart = false;
let isPomodoroCounterPaused = true;
let pomodoroList = [];
let currentPomodoro = 0;
let pomodoroInterval;

const SetPomodoroTimerValue = () => {
  countDownCounter = countDownCounter * 60;
  CovertSecondsToTimeDisplay();
};

const Reset = () => {
  clearInterval(pomodoroInterval);
  hasPomodoroStart = false;
  countDownCounter = pomodoroList[currentPomodoro].isCoolDown ? pomodoroList[currentPomodoro].coolDownCounter * 60 : pomodoroList[currentPomodoro].countDownCounter * 60;
  CovertSecondsToTimeDisplay();
};

const StartPomodoro = () => {
  // Toggle the counter
  if (!hasPomodoroStart) {
    hasPomodoroStart = true;
  }
  isPomodoroCounterPaused = !isPomodoroCounterPaused;
  if (!isPomodoroCounterPaused && hasPomodoroStart) {
        pomodoroInterval = setInterval(() => {
            countDownCounter--;
            CovertSecondsToTimeDisplay();
          }, 1000);
        } else {
          clearInterval(pomodoroInterval);
        }


  return;
};

const CovertSecondsToTimeDisplay = () => {
  if (countDownCounter < 0 && hasPomodoroStart) {
    if(currentPomodoro === pomodoroList.length - 1){
        hasPomodoroStart = false;
        clearInterval(pomodoroInterval);
    return;
    }
    else if(pomodoroList[currentPomodoro].isCoolDown === false){
        pomodoroList[currentPomodoro].isCoolDown = true;
        countDownCounter = pomodoroList[currentPomodoro].coolDownCounter * 60;
    }
    else{
        pomodoroList[currentPomodoro].isCompleted = true;
        currentPomodoro++;
        countDownCounter = pomodoroList[currentPomodoro].countDownCounter * 60;
    }
  }
  let hour = Math.floor(countDownCounter / 60 / 60);
  let minutes = Math.floor(countDownCounter / 60);
  let seconds = countDownCounter % 60;
  // using ternary if statements
  counterDisplayElement.innerText = `${hour.toString().padStart(2, 0)}:${minutes
    .toString()
    .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  return;
};

const isMinuteInputValid = (minuteInput) => {
  if (isNaN(minuteInput) || minuteInput < 1) {
    minuteInputError.innerText = MINUTE_ERROR;
    console.error(MINUTE_ERROR);
    return false;
  }
  return true;
};

const setTimerValue = (event) => {
    minuteInputError.innerText = "";
  const minuteValue = parseInt(event.target.value);
  const isValid = isMinuteInputValid(minuteValue);
  if (isValid && !hasPomodoroStart) {
    countDownCounter = minuteValue * 60;
    CovertSecondsToTimeDisplay();
  }
};

const ConvertPomodoroListToString = () => {
    let str = "";
    for(let value of pomodoroList){
        str += `\nPomodoro time is for ${value.countDownCounter} minutes with a ${value.coolDownCounter} minute cool down.`
    }
    return str;
}
const addPomodoroTimer = () => {
  const minuteValue = parseInt(minuteInputElement.value);
    const isValid = isMinuteInputValid(minuteValue);
    if(isValid){
        pomodoroList.push({
            countDownCounter: minuteValue,
            coolDownCounter: 1,
            isCoolDown: false,
            isCompleted: false
        })
    }
    listOfPomodoroTimersElement.innerText = ConvertPomodoroListToString();
}
// Set up
SetPomodoroTimerValue();
minuteInputElement.oninput = setTimerValue;
startStopBtnElement.onclick = StartPomodoro;
resetBtnElement.onclick = Reset;
addPomodoroBtnElement.onclick = addPomodoroTimer;

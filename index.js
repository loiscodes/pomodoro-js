const MINUTE_ERROR = "Time is not valid";

// Elements
const counterDisplayElement = document.getElementById("counterDisplay");
const pomodorAppElement = document.getElementById("pomodoro-app");
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
let pomodoroInterval,backgroundColorInterval;

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
    ChangeBackgroundColor("focus");
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
    
    if(pomodoroList[currentPomodoro].isCoolDown === false){
        pomodoroList[currentPomodoro].isCoolDown = true;
        countDownCounter = pomodoroList[currentPomodoro].coolDownCounter * 60;
        ChangeBackgroundColor("coolDown");
    }
    else{
        pomodoroList[currentPomodoro].isCompleted = true;
        currentPomodoro++;
        if(currentPomodoro === pomodoroList.length){
          hasPomodoroStart = false;
          clearInterval(pomodoroInterval);
          ChangeBackgroundColor("");
      return;
      }
      ChangeBackgroundColor("focus");
      
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
    console.log(pomodoroList);
    listOfPomodoroTimersElement.innerText = ConvertPomodoroListToString();
}

const ChangeBackgroundColor = (className) => {
  const classList = Array.from(pomodorAppElement.classList);
  pomodorAppElement.classList.add(className);
  console.log(pomodorAppElement);
  pomodorAppElement.classList.remove(...classList);
  
}
// Set up
SetPomodoroTimerValue();
minuteInputElement.oninput = setTimerValue;
startStopBtnElement.onclick = StartPomodoro;
resetBtnElement.onclick = Reset;
addPomodoroBtnElement.onclick = addPomodoroTimer;

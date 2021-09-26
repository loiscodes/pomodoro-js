// Elements
const pomodorAppElement = document.getElementById("pomodoro-app");
const pomodoroCounterDisplayElement = document.getElementById("pomodoroCounterDisplay");
const pomodoroFormElement = document.getElementsByClassName("pomorodoForm")[0];
const hourInputElement = document.getElementById("hoursInputText");
const minuteInputElement = document.getElementById("minutesInputText");
const secondInputElement = document.getElementById("secondsInputText");
const addCoolDownCounterElement = document.getElementById("addCoolDownCounter");
const coolDownInMinutesElement = document.getElementById("coolDownInMinutes");
//const dateTimeLocalInputElement = document.querySelector("input[type='datetime-local']");
//pomodoroErrorList
const pomodoroListOfErrorsElement = document.getElementById("pomodoroErrorList");
const addPomodoroToListButton = document.getElementById("pomorodoForm-addBtn");
const startOrPauseAPomodoroFromListButton = document.getElementById("pomorodoForm-StartPauseBtn");
const coolDownInMinutesInputElement = document.getElementById("coolDownInMinutes");
let pomodoroList = [];
let pomodoroInterval;
let hasPomodoroStart = false;
const errorList = {
  hour: "",
  minute: "",
  second: "",
};
let currentPomodoroId = 0;
let currentPomodoroTimer = 0;
let listOfErrors = "";
let defaultPomodoroSettings = {
  id: 0,
  focusTimerInSeconds: 300,
  pomodoroCompleted: false,
  pomodoroDescription: "",
  className: "focus",
  isPaused: true,
  cooldownPomodoro: {
    coolDownSet: true,
    cooldownCompleted: false,
    className: "coolDown",
    cooldownTimerInSeconds: 60,
    isPaused: true,
  }
};
// JS 1
const CovertSecondsToTimeDisplay = () => {
  let hour = Math.floor(currentPomodoroTimer / 60 / 60);
  let minutes = Math.floor(currentPomodoroTimer / 60);
  let seconds = currentPomodoroTimer % 60;
  // using ternary if statements
  pomodoroCounterDisplayElement.innerText = `${hour.toString().padStart(2, 0)}:${minutes
    .toString()
    .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
}
// Start Pomodoro
const StartPomodoro = () => {
  if (!hasPomodoroStart) {
    hasPomodoroStart = true;
    ChangeBackgroundColor(pomodoroList[currentPomodoroId].className);
  }
  // Check Status Of Pomodoro
  // pomodoroList[currentPomodoroId].isPaused = !pomodoroList[currentPomodoroId].isPaused;
  // if(pomodoroList[currentPomodoroId].isPaused === false){
      pomodoroInterval = setInterval(() => {
        currentPomodoroTimer--;
        CheckAndUpdateStatusOfPomodoro();
        CovertSecondsToTimeDisplay();
  }, 1000);
  // }else{
  //   clearInterval(pomodoroInterval);
  // }

}

const SetPomodoroTimerValue = () => {
  currentPomodoroTimer = pomodoroList[0].focusTimerInSeconds;
  CovertSecondsToTimeDisplay();
};

// Add Pomodoro
const AddPomodoroTimerToList = () =>{
const focusTimerInSeconds = ConvertTimeInputsToSeconds();
const id = pomodoroList.length;
pomodoroList.push({...defaultPomodoroSettings, id, focusTimerInSeconds });
  pomodoroList[id].cooldownPomodoro = addCoolDownCounterElement.checked ? {...defaultPomodoroSettings.cooldownPomodoro, cooldownTimerInSeconds: ConvertCooldownTimeInputToSeconds() } : null
return;
}

const CheckAndUpdateStatusOfPomodoro = () => {
// has currentTime completed?
//is it a cooldown timer
// Has the pomodoro started
if (currentPomodoroTimer < 0 && hasPomodoroStart) {
  if(pomodoroList[currentPomodoroId].cooldownPomodoro?.coolDownSet && pomodoroList[currentPomodoroId].cooldownPomodoro?.cooldownCompleted === false){
    pomodoroList[currentPomodoroId].cooldownPomodoro.cooldownCompleted = true;
    currentPomodoroTimer = pomodoroList[currentPomodoroId].cooldownPomodoro.cooldownTimerInSeconds;
    ChangeBackgroundColor(pomodoroList[currentPomodoroId].cooldownPomodoro.className);
    return;
  }
  else{
    currentPomodoroTimer = 0;
    pomodoroList[currentPomodoroId].pomodoroCompleted = true;
    currentPomodoroId++;
    if(currentPomodoroId === pomodoroList.length){
      hasPomodoroStart = false;
      clearInterval(pomodoroInterval);
      ChangeBackgroundColor(null);

    return;
    }
    ChangeBackgroundColor(pomodoroList[currentPomodoroId].className);
    
    currentPomodoroTimer = pomodoroList[currentPomodoroId].focusTimerInSeconds;
  }
}
}

//JS 3
const ConvertTimeInputsToSeconds = () => {
  const hour = parseInt(hourInputElement.value || 0) * 60 * 60;
  const minute = parseInt(minuteInputElement.value || 0) * 60;
  const second = parseInt(secondInputElement.value);
  return hour + minute + second;
}

const ConvertCooldownTimeInputToSeconds = () => {
  return parseInt(coolDownInMinutesElement.value) * 60;
}

// JS 8
const CheckElementValidity = (event) => {
  const {name, validity } = event.target;
  if(validity.valid){
    errorList[name] = "";
  }else{
    errorList[name] = `The ${name} input is not valid`;
  }
  SetCustomValidationForElement();
  SetButtonsEnabledDisabledState(validity.valid);
}

const SetCustomValidationForElement = () => {
  listOfErrors = Object.values(errorList).map((value) => `<div>${value}</div>`).join("");
  pomodoroListOfErrorsElement.innerHTML = listOfErrors;
}

const SetButtonsEnabledDisabledState = (isValid) => {
  addPomodoroToListButton.disabled = startOrPauseAPomodoroFromListButton.disabled = !isValid;
}

const HideShowCoolDownInputField = (event) => {
const { checked } = event.target;
  coolDownInMinutesInputElement.hidden = !checked;
}

const ChangeBackgroundColor = (className) => {
  const classList = Array.from(pomodorAppElement.classList);
  pomodorAppElement.classList.remove(...classList);
  pomodorAppElement.classList.add(className);
  
}

// Set event listeners
hourInputElement.addEventListener('input', CheckElementValidity);
minuteInputElement.addEventListener('input', CheckElementValidity);
secondInputElement.addEventListener('input', CheckElementValidity);
addCoolDownCounterElement.addEventListener('change', HideShowCoolDownInputField);
addPomodoroToListButton.addEventListener('click', (event)=>{
  event.stopPropagation();
  AddPomodoroTimerToList();
});

startOrPauseAPomodoroFromListButton.addEventListener('click', (event)=>{
  event.stopPropagation();
  SetPomodoroTimerValue();
  StartPomodoro();
})

// TODOs
/*
1. Add styling for 
*/

/* const MINUTE_ERROR = "Time is not valid";

// Elements
const startStopBtnElement = document.getElementById("startStopBtn");
const resetBtnElement = document.getElementById("resetBtn");
const addPomodoroBtnElement = document.getElementById("addPomodoroTimeBtn");
const listOfPomodoroTimersElement = document.querySelector(".listOfPomodoroTimers");
// let vars
let countDownCounter = 0;
let hasPomodoroStart = false;
let isPomodoroCounterPaused = true;
let defaultPomodoroSettings = {
  focusTimer: 1,
  pomodoroCompleted: false,
  className: "focus",
  cooldownPomodoro: {
    cooldownCompleted: false,
    className: "coolDown",
    cooldownTimer: 1,
  }
};

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
    ChangeBackgroundColor("focus");
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
          ChangeBackgroundColor(null);
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

const ConvertTimeInputToMinutes = () => {
const value = timerInputElement.value;
const time = value.split(":");
const hours = parseInt(time[0]) * 60 * 60;
const minutes = parseInt(time[2]) * 60;
const seconds = hours + minutes;
return value.length === 2 ? seconds : seconds + parseInt(value[3]);
}
const addPomodoroTimer = () => {
  const minuteValue = ConvertTimeInputToMinutes();
    const isValid = isMinuteInputValid(minuteValue);
    
    if(isValid){
        pomodoroList.push({...defaultPomodoroSettings, focusTimer: minuteValue})
    }
    listOfPomodoroTimersElement.innerText = ConvertPomodoroListToString();
}

const ChangeBackgroundColor = (className) => {
  const classList = Array.from(pomodorAppElement.classList);
  pomodorAppElement.classList.add(className);
  pomodorAppElement.classList.remove(...classList);
  
}
// Set up
SetPomodoroTimerValue();
timerInputElement.oninput = setTimerValue;
startStopBtnElement.onclick = StartPomodoro;
resetBtnElement.onclick = Reset;
addPomodoroBtnElement.onclick = addPomodoroTimer;
 */
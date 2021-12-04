// Elements
const pomodoroAppElement = document.getElementById("pomodoro-app");
const pomodoroCounterDisplayElement = document.getElementById(
  "pomodoroCounterDisplay"
);
const pomodoroFormElement = document.getElementsByClassName("pomorodoForm")[0];
const minuteInputElement = document.getElementById("minutesInputText");
const secondInputElement = document.getElementById("secondsInputText");
//pomodoroErrorList
const pomodoroListOfErrorsElement =
  document.getElementById("pomodoroErrorList");
const addPomodoroToListButton = document.getElementById("pomorodoForm-addBtn");
const pomodoroListElement = document.getElementById("PomodoroList");
const startOrPauseAPomodoroFromListButton = document.getElementById(
  "pomorodoForm-StartPauseBtn"
);
let pomodoroList = [];
let pomodoroInterval;
let hasPomodoroStart = false;
const errorList = {
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
  isWholePomodoroPaused: true,
};
// JS 1
const CovertSecondsToTimeDisplay = (timer) => {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  // using ternary if statements
  return minutes > 0 || seconds > 0
    ? `${minutes.toString().padStart(2, 0)}:${seconds
        .toString()
        .padStart(2, 0)}`
    : "00:00";
};

const SetPomodoroCounterDisplayElement = (seconds) =>
  (pomodoroCounterDisplayElement.innerText =
    CovertSecondsToTimeDisplay(seconds));
// Start Pomodoro
const StartPomodoro = () => {
  if (!hasPomodoroStart) {
    hasPomodoroStart = true;
    ChangeBackgroundColor(pomodoroList[currentPomodoroId].className);
  }
  // Check Status Of Pomodoro
  pomodoroList[currentPomodoroId].isWholePomodoroPaused =
    !pomodoroList[currentPomodoroId].isWholePomodoroPaused;
  if (pomodoroList[currentPomodoroId].isWholePomodoroPaused === false) {
    pomodoroInterval = setInterval(() => {
      startOrPauseAPomodoroFromListButton.innerText = "Pause";
      currentPomodoroTimer--;
      CheckAndUpdateStatusOfPomodoro();
      CovertSecondsToTimeDisplay(currentPomodoroTimer);
      SetPomodoroCounterDisplayElement(currentPomodoroTimer);
    }, 1000);
  } else {
    startOrPauseAPomodoroFromListButton.innerText = "Start";
    clearInterval(pomodoroInterval);
  }
};

const SetPomodoroTimerValue = () => {
  if (pomodoroList.length === 0) {
    AddPomodoroTimerToList();
  }
  if (!hasPomodoroStart) {
    currentPomodoroTimer = pomodoroList[0].focusTimerInSeconds;
    CovertSecondsToTimeDisplay(currentPomodoroTimer);
    SetPomodoroCounterDisplayElement(currentPomodoroTimer);
  }
};

// Add Pomodoro
const AddPomodoroTimerToList = () => {
  const focusTimerInSeconds = ConvertTimeInputsToSeconds();
  const id = pomodoroList.length;
  pomodoroList.push({ ...defaultPomodoroSettings, id, focusTimerInSeconds });
  UpdateListOfPomodorosOnPage();
  return;
};

const CheckAndUpdateStatusOfPomodoro = () => {
  // has currentTime completed?
  //is it a cooldown timer
  // Has the pomodoro started
  if (currentPomodoroTimer < 0 && hasPomodoroStart) {
    pomodoroList[currentPomodoroId].pomodoroCompleted = true;
    currentPomodoroId++;
    if (currentPomodoroId === pomodoroList.length) {
      hasPomodoroStart = false;
      clearInterval(pomodoroInterval);
      ChangeBackgroundColor(null);
      SetPomodoroCounterDisplayElement(0);
      startOrPauseAPomodoroFromListButton.innerText = "Start";
      return;
    }
    ChangeBackgroundColor(pomodoroList[currentPomodoroId].className);

    currentPomodoroTimer = pomodoroList[currentPomodoroId].focusTimerInSeconds;
  }
};

const ConvertTimeInputsToSeconds = () => {
  const minute = parseInt(minuteInputElement.value || 0) * 60;
  const second = parseInt(secondInputElement.value);
  return minute + second;
};

const CheckElementValidity = (event) => {
  const { name, validity } = event.target;
  if (validity.valid) {
    errorList[name] = "";
  } else {
    errorList[name] = `The ${name} input is not valid`;
  }
  SetCustomValidationForElement();
  SetButtonsEnabledDisabledState(validity.valid);
};

const SetCustomValidationForElement = () => {
  listOfErrors = Object.values(errorList)
    .map((value) => (value ? `<div>${value}</div>` : ""))
    .join("");
  pomodoroListOfErrorsElement.innerHTML = listOfErrors;
};

const SetButtonsEnabledDisabledState = (isValid) => {
  addPomodoroToListButton.disabled =
    startOrPauseAPomodoroFromListButton.disabled = !isValid;
};

const ChangeBackgroundColor = (className) => {
  const classList = Array.from(pomodoroAppElement.classList);
  pomodoroAppElement.classList.remove(...classList);
  pomodoroAppElement.classList.add(className);
};

const UpdateListOfPomodorosOnPage = () => {
  pomodoroListElement.innerHTML = pomodoroList
    .map((pomodoro) => CovertSecondsToTimeDisplay(pomodoro.focusTimerInSeconds))
    .join("<br />");
};

// Set event listeners
minuteInputElement.addEventListener("input", CheckElementValidity);
secondInputElement.addEventListener("input", CheckElementValidity);
// JS One
addPomodoroToListButton.addEventListener("click", (event) => {
  event.stopPropagation();
  AddPomodoroTimerToList();
});

startOrPauseAPomodoroFromListButton.addEventListener("click", (event) => {
  event.stopPropagation();
  SetPomodoroTimerValue();
  StartPomodoro();
});

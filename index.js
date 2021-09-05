const COUNTER_DISPLAY = document.getElementById('counterDisplay');
const minuteInput = document.getElementById('minuteInput');
const MINUTE_ERROR = 'Time is not valid';
let countDownCounter = 0;
let hasPomodoroStart = false;
let isPomodoroCounterPaused = true;
let pomodoroInterval;

const SetPomodoroTimerValue = () => {
    countDownCounter = countDownCounter * 60;
    CovertSecondsToTimeDisplay();
}

const Reset = () => {
    clearInterval(pomodoroInterval);
    countDownCounter = 20;
    CovertSecondsToTimeDisplay();
}

const StartPomodoro = () => {
// Toggle the counter
    if(!hasPomodoroStart){
        hasPomodoroStart = true;
    }
    isPomodoroCounterPaused = !isPomodoroCounterPaused;
    if(!isPomodoroCounterPaused && hasPomodoroStart){
        pomodoroInterval = setInterval(()=>{
            countDownCounter--;
            CovertSecondsToTimeDisplay();
        },1000);
    }else{
        clearInterval(pomodoroInterval);
    }

return;
};

const CovertSecondsToTimeDisplay = () => {
if(countDownCounter < 0 && hasPomodoroStart){
    clearInterval(pomodoroInterval);
    return;
}
let hour = Math.floor(countDownCounter / 60 / 60);
let minutes = Math.floor(countDownCounter / 60);
let seconds = countDownCounter % 60;
// using ternary if statements
COUNTER_DISPLAY.innerText = `${hour.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`;
return;
}

const isMinuteInputValid = (minuteInput) => {
    if(isNaN(minuteInput) || minuteInput < 1){
        minuteInputError.innerText = MINUTE_ERROR;
        console.error(MINUTE_ERROR);
        return false;
    }
    return true;
    
}

const setTimerValue = (event) => {
const MINUTE_VALUE = parseInt(event.target.value);
    const isValid = isMinuteInputValid(MINUTE_VALUE);
    if(isValid && !hasPomodoroStart){
        countDownCounter = MINUTE_VALUE * 60;
        CovertSecondsToTimeDisplay();
    }

}
SetPomodoroTimerValue();
minuteInput.oninput = setTimerValue;
document.getElementById('counterBtn').onclick = StartPomodoro;
document.getElementById('restartBtn').onclick = Reset;

const COUNTER_DISPLAY = document.getElementById('counterDisplay');
let countDownCounter = 20;
let hasPomodoroStart = false;
let isPomodoroCounterPaused = true;
let pomodoroInterval;

const SetPomodoroTimerValue = () => {
    countDownCounter = countDownCounter * 60;
    covertSecondsToTimeDisplay();
}

const Reset = () => {
    clearInterval(pomodoroInterval);
    countDownCounter = 20;
    covertSecondsToTimeDisplay();
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
            covertSecondsToTimeDisplay();
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

SetPomodoroTimerValue();
document.getElementById('counterBtn').onclick = StartPomodoro;
document.getElementById('restartBtn').onclick = Reset;
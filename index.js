const COUNTER_DISPLAY = document.getElementById('counterDisplay');
let countDownCounter = 20;
let hasCounterBegan = false;
let pausedCounter = true;
let interval;

function reset(){
    clearInterval(interval);
    countDownCounter = 20;
    covertSecondsToTimeDisplay();
}

function countDown(){
// Toggle the counter
    if(!hasCounterBegan){
        hasCounterBegan = true;
    }
    pausedCounter = !pausedCounter;
    if(!pausedCounter && hasCounterBegan){
        interval = setInterval(()=>{
            countDownCounter--;
            covertSecondsToTimeDisplay();
        },1000);
    }else{
        clearInterval(interval);
    }

return;
};
// function startCounter(){

function covertSecondsToTimeDisplay(){
if(countDownCounter < 0 && hasCounterBegan){
    clearInterval(interval);
    return;
}
let hour = Math.floor(countDownCounter / 60 / 60);
let minutes = Math.floor(countDownCounter / 60);
let seconds = countDownCounter % 60;
// using ternary if statements
COUNTER_DISPLAY.innerText = `${hour.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`;
return;
}

function isMinuteInputValid(minuteInput){
    if(isNaN(minuteInput) || minuteInput < 1){
        minuteInputError.innerText = MINUTE_ERROR;
        console.error(MINUTE_ERROR);
        return false;
    }
    return true;
    
}

function setTimerValue(){
        countDownCounter = countDownCounter * 60;
        covertSecondsToTimeDisplay();
}

setTimerValue();
document.getElementById('counterBtn').addEventListener('click',countDown);
document.getElementById('restartBtn').addEventListener('click',reset);
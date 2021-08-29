const COUNTER_DEFAULT = 1205;
const COUNTER_DISPLAY = document.getElementById('counterDisplay');
let countDownCounter = COUNTER_DEFAULT;
let hasCounterBegan = false;
let interval;

function reset(){
    clearInterval(interval);
    countDownCounter = COUNTER_DEFAULT;
    covertSecondsToTimeDisplay();
}

function countDown(){
// if counter began
hasCounterBegan = !hasCounterBegan;
if(hasCounterBegan){
    interval = setInterval(()=>{
        countDownCounter--;
        covertSecondsToTimeDisplay();
    },1000);
}else{
    clearInterval(interval);
}

};

function covertSecondsToTimeDisplay(){
if(countDownCounter <= 0 && hasCounterBegan){
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

covertSecondsToTimeDisplay();
document.getElementById('counterBtn').addEventListener('click',countDown);
document.getElementById('restartBtn').addEventListener('click',reset);
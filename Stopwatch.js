let startTime = 0;
let pausedTime = 0;
let isRunning = false;
let interval;
let lapCount = 1;

document.querySelector('.js-start-button').addEventListener('click',() =>{
    startStop();
});

document.querySelector('.js-reset-button').addEventListener('click',() =>{
    reset();
});

document.querySelector('.js-lap-button').addEventListener('click',() =>{
    addLap();
});

document.body.addEventListener('keydown',(event) => {
    if(event.key === 's'){
        startStop();
    }
    else if(event.key === 'r'){
        reset();
    }
    else if(event.key === 'l'){
        addLap();
    }
});


// Call updateTime initially to prevent the random number issue.
updateTime();
document.querySelector('.time').innerHTML = "00:00:00:00";

function startStop(){
    if(isRunning){
        clearInterval(interval);
        pausedTime = Date.now();
        document.querySelector('.js-start-button').innerHTML = "Start";
    }
    else{
        if(startTime === 0){
            startTime = Date.now();
        }
        else{
            const currentTime = Date.now();
            const pauseDuration = currentTime - pausedTime;
            startTime += pauseDuration;
        }
        interval = setInterval(updateTime, 10);
        document.querySelector('.js-start-button').innerHTML = "Stop";
    }
    isRunning = !isRunning;
}

function reset(){
    clearInterval(interval);
    document.querySelector('.js-start-button').innerHTML = "Start";
    document.querySelector('.time').innerHTML = "00:00:00:00";
    isRunning = false;
    startTime = 0;
    pausedTime = 0;
    lapCount = 1;
    clearLaps();
}

function updateTime(){
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    document.querySelector('.time').innerHTML = formatTime(elapsedTime);
}

function addLap(){
    if(isRunning){
        const currentTime = Date.now() - startTime;
        const lapTime = formatTime(currentTime);
        const lapList = document.querySelector('.lapList');

        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        
        // Insert the new lap item at the top of the list
        lapList.insertBefore(lapItem, lapList.firstChild);

        lapCount++;
    }
        
}

function clearLaps(){
    document.querySelector('.lapList').innerHTML = '';
}

function formatTime(Time){
    const hours = Math.floor(Time/3600000);
    const minutes = Math.floor((Time % 3600000) / 60000);
    const seconds = Math.floor((Time % 60000) / 1000);
    const milliseconds = (Time % 1000).toString().slice(0,2);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds}`;
}
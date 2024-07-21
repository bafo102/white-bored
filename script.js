/*  STATUSES
let timerStatus = "pending";
    - buttons disabled
    + input ready
    - timer at 00:00:00
    - markers at default
    - progress bar disabled

let timerStatus = "ready";
    + buttons enabled
    - input ready
    + timer has value
    - markers have value
    + progress bar enable

let timerStatus = "playing";
    + buttons enabled
    - input disabled
    + timer has value
    - markers have value
    + progress bar transforming

let timerStatus = "paused";
    + buttons enabled
    - input disabled
    + timer has value
    - markers have value
    + progress bar holds

    FUNCTIONS
*/






let timerStatus = "pending";
const ppButton = document.querySelector("#pp-button");
const resetButton = document.querySelector("#reset-button");
let durationInMili = 0;
let endTime = 0;
let currentTime = 0;
let newCurrentTime = 0;
let intervalId = '';

function getVar() {
    minuteInput = document.querySelector('#minute-input').value;
    durationInMili = minuteInput * 60 * 1000;
    start = new Date(); // Use new Date() so getHours can work
    startHour = start.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    startMin = start.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    oneThird = new Date(Date.now() + (durationInMili/3));
    oneThirdHour = oneThird.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    oneThirdMin = oneThird.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    twoThird = new Date(Date.now() + (durationInMili/3*2));
    twoThirdHour = twoThird.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    twoThirdMin = twoThird.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    end = new Date(Date.now() + durationInMili);
    endHour = end.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    endMin = end.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    startToUpdate = document.getElementById("start-time");
    oneThirdToUpdate = document.getElementById("one-third");
    twoThirdToUpdate = document.getElementById("two-third");
    endToUpdate = document.getElementById("end-time");
    hoursToUpdate = Math.floor(minuteInput / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    minutesToUpdate = (Math.floor(minuteInput) - hoursToUpdate*60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    secondsToUpdate = Math.floor((minuteInput % 1) * 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    hrs = document.querySelector('.hours');
    mins = document.querySelector('.minutes');
    secs = document.querySelector('.seconds');
}

function updateReadyTimer() {
    hrs.textContent = hoursToUpdate;
    mins.textContent = minutesToUpdate;
    secs.textContent = secondsToUpdate;
}

function updateReadyTimeMark() {
    startToUpdate.textContent = `${startHour}:${startMin}`;
    oneThirdToUpdate.textContent = `${oneThirdHour}:${oneThirdMin}`;
    twoThirdToUpdate.textContent = `${twoThirdHour}:${twoThirdMin}`;
    endToUpdate.textContent = `${endHour}:${endMin}`;
}

function validInput() {
    getVar();
    if (minuteInput == "" || isNaN(minuteInput)) {
        timerStatus = "pending";
        // disable buttons
        document.getElementById('pp-button').disabled = true;
        document.getElementById('reset-button').disabled = true;
        // keep timer default
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        // keep markers default
        startToUpdate.textContent = "Start";
        oneThirdToUpdate.textContent = "1/3";
        twoThirdToUpdate.textContent = "2/3";
        endToUpdate.textContent = "End";
        // announce error
        console.log("Input must be a number.");
    } else {
        timerStatus = "ready";
        // enable buttons
        document.getElementById('pp-button').disabled = false;
        document.getElementById('reset-button').disabled = false;
        // update timer
        updateReadyTimer()
        // update markers
        updateReadyTimeMark()
    }
}


function updateButtonStatus() {
    if (document.querySelector('#pp-button').className == "fa-solid fa-play pp-button") {
        document.querySelector('#pp-button').className = "fa-solid fa-pause pp-button"
    }
    else if (document.querySelector('#pp-button').className == "fa-solid fa-pause pp-button") {
        document.querySelector('#pp-button').className = "fa-solid fa-play pp-button"
    }
}

ppButton.addEventListener("click", () => {
    // update button status
    updateButtonStatus();
    // disable input
    document.getElementById('minute-input').disabled = true;

    // to play for the first time
    if (timerStatus == "ready") {
        timerStatus = "playing";
        console.log(timerStatus);
        // get fixed endTime
        endTime = Date.now() + durationInMili;
        getVar();
        updateReadyTimeMark();
        intervalId = setInterval(countdown, 50);
    }
    // to pause
    else if (timerStatus == "playing") {
        timerStatus = "paused";
        console.log(timerStatus);
        newCurrentTime = endTime - Date.now();
        clearInterval(intervalId);
    }
    // to play again
    else if (timerStatus == "paused") {
        timerStatus = "playing";
        console.log(timerStatus);
        endTime = Date.now() + newCurrentTime;
        getVar();
        intervalId = setInterval(countdown, 50);
    }
});


function countdown() {
    currentTime = endTime - Date.now();
    // update timer
    hrsToUpdate = Math.floor((currentTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    minsToUpdate = Math.floor((currentTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    secsToUpdate = Math.floor((currentTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    console.log(`${hrsToUpdate}:${minsToUpdate}:${secsToUpdate}`);
    hrs = document.querySelector('.hours');
    mins = document.querySelector('.minutes');
    secs = document.querySelector('.seconds');
    hrs.textContent = hrsToUpdate;
    mins.textContent = minsToUpdate;
    secs.textContent = secsToUpdate;

    // end
    if (currentTime < 0) {
        clearInterval(intervalId);
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
    }
    // update progress bar
    // change bar color when two third
}

resetButton.addEventListener("click", () => {
    if (confirm('Reset?')) {
        // stop counting down
        clearInterval(intervalId);
        // reset time variables
        endTime = 0;
        remainingTime = 0;
        // enable input
        document.getElementById('minute-input').disabled = false;
        // disable buttons
        document.getElementById('pp-button').disabled = true;
        document.getElementById('reset-button').disabled = true;
        // reset input value
        document.getElementById('minute-input').value = '';
        // reset timer
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        // reset markers
        document.getElementById("start-time").textContent = "Start";
        document.getElementById("one-third").textContent = "1/3";
        document.getElementById("two-third").textContent = "2/3";
        document.getElementById("end-time").textContent = "End";
        // reset button status
        document.getElementById("pp-button").className = "fa-solid fa-play pp-button";
      } else {}
});


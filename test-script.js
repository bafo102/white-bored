/*  STATUSES
let timerStatus = "pending";
    - buttons disabled
    + input ready
    - timer at 00:00:00
    - markers at default
    - progress bar disabled

let timerStatus = "ready";
    - buttons enabled
    - input ready
    - timer has value
    - markers have value
    - progress bar enable

let timerStatus = "playing";
    - buttons enabled
    - input disabled
    - timer has value
    - markers have value
    - progress bar transforming

let timerStatus = "paused";
    - buttons enabled
    - input disabled
    - timer has value
    - markers have value
    - progress bar holds

    FUNCTIONS
updateButtonStatus()
updateTimer()
updateMarker()
reset()


*/

const hrs = document.querySelector('.hours');
const mins = document.querySelector('.minutes');
const secs = document.querySelector('.seconds');
const ppBtnClass = document.querySelector('#pp-button').className;
const ppBtn = document.querySelector('#pp-button');
const resetBtn = document.querySelector('#reset-button');
let minuteInput = document.getElementById('minute-input').value;
let durationInMili =  minuteInput * 60 * 1000;
let endTime = 0;
let remainingTime = 0;
    // currentTime = Date.now();
    // remainingTime = endTime - currentTime;


ppBtn.addEventListener("click", () => {
    // to play
    if (ppBtnClass == "fa-solid fa-play pp-button") {
        console.log(`ppBtnClass is ${ppBtnClass}`)
        // update btn
        document.querySelector('#pp-button').className = "fa-solid fa-pause pp-button";
        // if first start
        if (document.getElementById('minute-input').disabled == false) {
            // disable input
            document.getElementById('minute-input').disabled = true;
            // finalize endTime
            endTime = Date.now() + durationInMili;
            // reset timeMark
            updateTimeMark();
        }
        console.log(`Fixed endTime is ${endTime}`);
        intervalId = setInterval(updateTimer, 1000);
    }
    
    // to pause
    else if (ppBtnClass == "fa-solid fa-pause pp-button") {
        clearInterval(intervalId);
        document.querySelector('#pp-button').className = "fa-solid fa-play pp-button";
    }
});


// play
// > first start    > lock input > get fixed endTime > update timer
// > paused         > update timer


function updateTimer() {
    // update timer
    remainingTime = endTime - Date.now();
    // console.log(`remainingTime is ${remainingTime}`);
    hrsToUpdate = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    minsToUpdate = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    secsToUpdate = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    console.log(`${hrsToUpdate}:${minsToUpdate}:${secsToUpdate}`);
    hrs.textContent = hrsToUpdate;
    mins.textContent = minsToUpdate;
    secs.textContent = secsToUpdate;

    // end
    if (remainingTime < 0) {
        clearInterval(intervalId);
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
    }

    // update progress bar

    // disable input
    
    // change bar color when two third

}

function updateTimeMark() {
    minuteInput = document.getElementById('minute-input').value;
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

    if (minuteInput == "" || isNaN(minuteInput)) {
        document.getElementById('pp-button').disabled = true;
        document.getElementById('reset-button').disabled = true;
        startToUpdate.textContent = "Start";
        oneThirdToUpdate.textContent = "1/3";
        twoThirdToUpdate.textContent = "2/3";
        endToUpdate.textContent = "End";
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        console.log("Input is empty or not a number")
    } else {
        document.getElementById('pp-button').disabled = false;
        document.getElementById('reset-button').disabled = false;
        startToUpdate.textContent = `${startHour}:${startMin}`;
        oneThirdToUpdate.textContent = `${oneThirdHour}:${oneThirdMin}`;
        twoThirdToUpdate.textContent = `${twoThirdHour}:${twoThirdMin}`;
        endToUpdate.textContent = `${endHour}:${endMin}`;
        hrs.textContent = hoursToUpdate;
        mins.textContent = minutesToUpdate;
        secs.textContent = secondsToUpdate;
    }
}


function reset() {
    if (confirm('Reset?')) {
        clearInterval(intervalId);
        document.getElementById('minute-input').disabled = false;
        document.getElementById('minute-input').value = '';
        document.getElementById("start-time").textContent = "Start";
        document.getElementById("one-third").textContent = "1/3";
        document.getElementById("two-third").textContent = "2/3";
        document.getElementById("end-time").textContent = "End";
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        document.getElementById("pp-button").className = "fa-solid fa-play pp-button";
      } else {}
}


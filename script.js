let timerStatus = "pending";
const ppButton = document.querySelector("#pp-button");
const resetButton = document.querySelector("#reset-button");
let durationInMili = 0;
let endTime = 0;
let currentTime = 0;
let newCurrentTime = 0;
let intervalId = '';
let progressBar = document.querySelectorAll('.progress-bar');

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

function updateMarkerWhenPaused() {
    if (newCurrentTime >= (durationInMili/3*2)) {
        oneThirdToUpdate.textContent = "1/3";
        twoThirdToUpdate.textContent = "2/3";
        endToUpdate.textContent = "End";
    }
    else if (newCurrentTime >= (durationInMili/3)) {
        twoThirdToUpdate.textContent = "2/3";
        endToUpdate.textContent = "End";
    }
    else {
        endToUpdate.textContent = "End";
    }
}

function updateMarkerAfterPausing() {
    if (newCurrentTime >= (durationInMili/3*2)) {
        oneThird = new Date(Date.now() + (newCurrentTime/3));
        oneThirdHour = oneThird.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        oneThirdMin = oneThird.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

        twoThird = new Date(Date.now() + (newCurrentTime/3*2));
        twoThirdHour = twoThird.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        twoThirdMin = twoThird.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

        end = new Date(Date.now() + newCurrentTime);
        endHour = end.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        endMin = end.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

        oneThirdToUpdate.textContent = `${oneThirdHour}:${oneThirdMin}`;
        twoThirdToUpdate.textContent = `${twoThirdHour}:${twoThirdMin}`;
        endToUpdate.textContent = `${endHour}:${endMin}`;
    }
    else if (newCurrentTime >= (durationInMili/3)) {
        twoThird = new Date(Date.now() + (newCurrentTime/3*2));
        twoThirdHour = twoThird.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        twoThirdMin = twoThird.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

        end = new Date(Date.now() + newCurrentTime);
        endHour = end.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        endMin = end.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

        twoThirdToUpdate.textContent = `${twoThirdHour}:${twoThirdMin}`;
        endToUpdate.textContent = `${endHour}:${endMin}`;
    }
    else {
        end = new Date(Date.now() + newCurrentTime);
        endHour = end.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        endMin = end.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        endToUpdate.textContent = `${endHour}:${endMin}`;
    }
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
        // change stt
        timerStatus = "playing";
        console.log(timerStatus);
        // get fixed endTime
        endTime = Date.now() + durationInMili;
        getVar();
        updateReadyTimeMark();
        // countdown
        intervalId = setInterval(countdown, 50);
    }
    // to pause
    else if (timerStatus == "playing") {
        timerStatus = "paused";
        console.log(timerStatus);
        newCurrentTime = endTime - Date.now();
        clearInterval(intervalId);
        // change last 3 markers to default
        updateMarkerWhenPaused();
    }
    // to play again
    else if (timerStatus == "paused") {
        timerStatus = "playing";
        console.log(timerStatus);
        endTime = Date.now() + newCurrentTime;
        getVar();
        // update last 3 markers
        updateMarkerAfterPausing();
        // countdown
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

    
    // update progress bar
    progressBar[0].style.width = (currentTime / durationInMili)*100 + "%";
    // change bar color when two third
    // end
    if (currentTime < 0) {
        clearInterval(intervalId);
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        progressBar[0].style.width = 0 + "%";
    }
}

resetButton.addEventListener("click", () => {
    if (currentTime < 0) {
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
        // reset progress bar with
        progressBar[0].style.width = 100 + "%";
    }

    else if (confirm('Reset?')) {
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
        // reset progress bar with
        progressBar[0].style.width = 100 + "%";
      } else {}
});

// table size: height, width
const table1 = (3,10);
// table coordinates
const room_01 = [
    [[0,4],[3,14]],[(0,22),(3,32)],
    [(5,4),(8,14)],[(5,22),(8,32)],
    [(10,4),(13,14)],[(10,22),(13,32)],
    [(15,4),(18,14)],[(15,22),(18,32)],
    [(20,4),(23,14)],[(20,22),(23,32)],
    [(25,4),(28,14)],[(25,22),(28,32)]
];

function createTable() {
    let newTable = document.createElement("div");
    newTable.setAttribute("id", "draggable");
    newTable.classList.add("draggable");
    newTable.classList.add("ui-widget-content");
    newTable.classList.add("ui-draggable");
    newTable.classList.add("ui-draggable-handle");
    // newTable.style.left = "100px";
    // newTable.style.top = "100px";
    let tableNumber = document.createTextNode("1");
    newTable.appendChild(tableNumber);
    let currentDiv = document.querySelector(".to-insert-before");
    let parent = document.querySelector(".tables");
    parent.insertBefore(newTable, currentDiv);
    // for (const table of room_01) {
    //     console.log(`${room_01}`);
    // }
}

let gridToggle = document.querySelector('#grid-toggle');
let grid = document.querySelector('.grid');
gridToggle.addEventListener("click", () => {
    if (gridToggle.checked) {
        grid.style.visibility = "visible";
        $( function() {
            $( ".draggable" ).draggable({ grid: [ 30, 30 ] });
        } );        
    }
    else {
        grid.style.visibility = "hidden";
    }
});

{/* <div id="draggable" class="draggable ui-widget-content ui-draggable ui-draggable-handle" style="position: relative; left: 163px; top: 134px;"></div> */}

// function createTable() {
//     // create a new div element
//     const newTable = document.createElement("div");
  
//     // and give it some content
//     const tableNumber = document.createTextNode("1");
  
//     // add the text node to the newly created div
//     newTable.appendChild(tableNumber);
  
//     // add the newly created element and its content into the DOM
//     const currentDiv = document.querySelector(".to-insert-before");
//     const parent = document.querySelector(".room-diagram");
//     // parent.insertBefore(newTable, currentDiv);
//     parent.insertBefore(newTable, currentDiv);
// }
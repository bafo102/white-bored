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




// table sizes [h, w, seats]
const half_rounded = [3, 10, 2];
const all_rounded_2 = [4, 10, 2];
const all_rounded_3 = [4, 10, 3];
const rectangle = [3, 6, 1];
const rectangle_2 = [3, 6, 2];
const trapezoid = [3, 6, 1];
const trapezoid_i = [3, 6, 1];
const cluster = [3, 10, 3];
const cluster_i = [3, 10, 3];

// table coordinates [t, l, name]
const room_103 = [
    [[2,2],"trapezoid"],[[2,13],"half-rounded"],[[2,28],"trapezoid"],
    [[8,2],"trapezoid"],[[8,13],"cluster"],[[8,28],"trapezoid"],
    [[14,2],"trapezoid"],[[14,13],"cluster"],[[14,28],"trapezoid"],
    [[20,2],"trapezoid"],[[20,13],"cluster"],[[20,28],"trapezoid"],
    [[26,15],"trapezoid"]

];
const room_104 = [
    [[1,0],"rectangle"],[[1,6],"rectangle"],[[1,30],"rectangle"],
    [[7,0],"rectangle"],[[7,6],"rectangle"],[[7,18],"rectangle"],[[7,24],"rectangle"],[[7,30],"rectangle"],
    [[13,0],"rectangle"],[[13,6],"rectangle"],[[13,18],"rectangle"],[[13,24],"rectangle"],[[13,30],"rectangle"],
    [[19,0],"rectangle"],[[19,6],"rectangle"],[[19,18],"rectangle"],[[19,24],"rectangle"],[[19,30],"rectangle"],
    [[25,0],"rectangle"],[[25,6],"rectangle"],[[25,18],"rectangle"],[[25,24],"rectangle"],[[25,30],"rectangle"]
];
const room_203 = [
    [[1,0],"rectangle"],[[1,6],"rectangle"],[[1,18],"rectangle"],[[1,24],"rectangle"],[[1,30],"rectangle"],
    [[7,0],"rectangle"],[[7,6],"rectangle"],[[7,18],"rectangle"],[[7,24],"rectangle"],[[7,30],"rectangle"],
    [[13,0],"rectangle"],[[13,6],"rectangle"],[[13,18],"rectangle"],[[13,24],"rectangle"],[[13,30],"rectangle"],
    [[19,0],"rectangle"],[[19,6],"rectangle"],[[19,18],"rectangle"],[[19,24],"rectangle"],[[19,30],"rectangle"],
    [[25,0],"rectangle"],[[25,6],"rectangle"],[[25,18],"rectangle"],[[25,24],"rectangle"],[[25,30],"rectangle"]
];
const room_204 = [
    [[2,2],"trapezoid"],[[2,11],"rectangle-2"],[[2,19],"trapezoid"],[[2,28],"trapezoid"],
    [[8,2],"trapezoid"],[[8,11],"rectangle-2"],[[8,19],"trapezoid"],[[8,28],"trapezoid"],
    [[14,2],"trapezoid"],[[14,11],"trapezoid"],[[14,19],"trapezoid"],[[14,28],"trapezoid"],
    [[20,2],"trapezoid"],[[20,11],"trapezoid"],[[20,19],"trapezoid"],[[20,28],"trapezoid"],
    [[26,11],"trapezoid"],[[26,19],"trapezoid"]
];
const room_303 = [
    [[1,0],"rectangle"],[[1,6],"rectangle"],[[1,12],"rectangle"],[[1,24],"rectangle"],[[1,30],"rectangle"],
    [[7,0],"rectangle"],[[7,6],"rectangle"],[[7,12],"rectangle"],[[7,24],"rectangle"],[[7,30],"rectangle"],
    [[13,0],"rectangle"],[[13,6],"rectangle"],[[13,12],"rectangle"],[[13,24],"rectangle"],[[13,30],"rectangle"],
    [[19,0],"rectangle"],[[19,6],"rectangle"],[[19,12],"rectangle"],[[19,24],"rectangle"],[[19,30],"rectangle"],
    [[25,0],"rectangle"],[[25,6],"rectangle"],[[25,12],"rectangle"],[[25,24],"rectangle"],[[25,30],"rectangle"]
]
const room_304 = [
    [[1,0],"rectangle"],[[1,6],"rectangle"],[[1,12],"rectangle"],[[1,24],"rectangle"],[[1,30],"rectangle"],
    [[7,0],"rectangle"],[[7,6],"rectangle"],[[7,12],"rectangle"],[[7,24],"rectangle"],[[7,30],"rectangle"],
    [[13,0],"rectangle"],[[13,6],"rectangle"],[[13,12],"rectangle"],[[13,24],"rectangle"],[[13,30],"rectangle"],
    [[19,0],"rectangle"],[[19,6],"rectangle"],[[19,12],"rectangle"],[[19,24],"rectangle"],[[19,30],"rectangle"],
    [[25,0],"rectangle"],[[25,6],"rectangle"],[[25,12],"rectangle"],[[25,24],"rectangle"],[[25,30],"rectangle"]
];
const room_401 = [
    [[1,2],"all-rounded-2"],[[1,26],"all-rounded-2"],
    [[7,2],"all-rounded-2"],[[7,14],"all-rounded-2"],[[7,26],"all-rounded-2"],
    [[13,2],"all-rounded-2"],[[13,14],"all-rounded-2"],[[13,26],"all-rounded-2"],
    [[19,2],"all-rounded-2"],[[19,14],"all-rounded-2"],[[19,26],"all-rounded-2"],
    [[25,2],"all-rounded-2"],[[25,14],"all-rounded-2"],[[25,26],"all-rounded-2"]
];
const room_401_b = [
    [[1,2],"all-rounded-3"],[[1,26],"all-rounded-3"],
    [[7,2],"all-rounded-3"],[[7,14],"all-rounded-3"],[[7,26],"all-rounded-3"],
    [[13,2],"all-rounded-3"],[[13,14],"all-rounded-3"],[[13,26],"all-rounded-3"],
    [[19,2],"all-rounded-3"],[[19,14],"all-rounded-3"],[[19,26],"all-rounded-3"],
    [[25,2],"all-rounded-3"],[[25,14],"all-rounded-3"],[[25,26],"all-rounded-3"]
];
const room_01_02 = [
    [[1,4], "half-rounded"],[[1,22], "half-rounded"],
    [[6,4], "half-rounded"],[[6,22], "half-rounded"],
    [[11,4], "half-rounded"],[[11,22], "half-rounded"],
    [[16,4], "half-rounded"],[[16,22], "half-rounded"],
    [[21,4], "half-rounded"],[[21,22], "half-rounded"],
    [[26,4], "half-rounded"],[[26,22], "half-rounded"]
];

const roomInputs = ["D1.03", "D1.04", "D2.03", "D2.04", "D3.03", "D3.04", "D4.01", "D4.01.b"];
const rooms = [room_103, room_104, room_203, room_204, room_303, room_304, room_401, room_401_b];

const tableNames = ["half-rounded", "all-rounded-2", "all-rounded-3", "rectangle", "rectangle-2", "trapezoid", "trapezoid-i", "cluster", "cluster-i"];
const tables = [half_rounded, all_rounded_2, all_rounded_3, rectangle, rectangle_2, trapezoid, trapezoid_i, cluster, cluster_i];

let gridToggle = document.querySelector('#grid-toggle');
let roomTables = [];
let tableSeats = [];
let room;
let gridDimensions = document.querySelector('#grid').getBoundingClientRect();
let gridCellHeight = gridDimensions.height/30;
let gridCellWidth = gridDimensions.width/36;

function createTables() {
    // identify room name
    let roomInput = document.querySelector('#room-input').value;
    if (roomInput=="D1.02" || roomInput=="D2.01" || roomInput=="D2.02" || roomInput=="D3.01" || roomInput=="D3.02") {
        room = room_01_02;
    }
    else {
        room = rooms[roomInputs.indexOf(roomInput)];
    }

    for (let i = 0; i < room.length; i++) {
        let newTable = document.createElement("div");
        // add id to table
        newTable.setAttribute("id", `table${i+1}`);
        // add id to a list to manipulate
        roomTables.push(`table${i+1}`);
        // set position, "relative" ruin the layout
        newTable.style.setProperty('position', "absolute");
        // add class to table
        newTable.classList.add("draggable");
        newTable.classList.add(room[i][1]);
        newTable.tabIndex = 0;
        // make table draggable
        $(newTable).draggable({
            containment: ".tables",
            snap: true,
            cursor: "pointer",
            zIndex: 100,
            // prevent scrolling out of parent div
            scroll: false,
            snapTolerance: 10,
            // update top and left to percentage once dragging stops
            stop: function () {
                var l = ( 100 * parseFloat($(this).position().left / parseFloat($(this).parent().width())) ) + "%" ;
                var t = ( 100 * parseFloat($(this).position().top / parseFloat($(this).parent().height())) ) + "%" ;
                $(this).css("left", l);
                $(this).css("top", t);
                $(this).click();
            }
        });

        // disable snapping for weird table
        if (room[i][1]=="trapezoid" || room[i][1]=="trapezoid-i" || room[i][1]=="cluster" || room[i][1]=="cluster-i") {
            $(newTable).draggable({
                snap: false
              });
        }

        // set table size
        newTable.style.setProperty('height', String((((100/30) * (tables[tableNames.indexOf(room[i][1])][0]) +"%"))));
        newTable.style.setProperty('width', String((((100/36) * (tables[tableNames.indexOf(room[i][1])][1]) +"%"))));

        // set table position
        newTable.style.setProperty('left', String(((100/36) * room[i][0][1] + "%")));
        newTable.style.setProperty('top', String(((100/30) * room[i][0][0] + "%")));

        // finalize
        let divToInsertBefore = document.querySelector(".to-insert-before");
        let parent = document.querySelector(".tables");
        parent.insertBefore(newTable, divToInsertBefore);

        // set table seat
        for (let j = 0; j < tables[tableNames.indexOf(room[i][1])][2]; j++) {
            let tableNumber = document.createElement("input");
            tableNumber.setAttribute('value', "");
            if (tableSeats.length==0) {
                tableNumber.setAttribute('id', 'seat1');
                tableSeats.push('seat1');
            }
            else {
                tableNumber.setAttribute('id', `seat${parseInt(tableSeats[tableSeats.length-1].substr(4)) + 1}`);
                tableSeats.push(`seat${parseInt(tableSeats[tableSeats.length-1].substr(4)) + 1}`);
            }
            
            tableNumber.classList.add("seat");
            newTable.appendChild(tableNumber);
        }
        
        if (room[i][1]=="trapezoid") {
            let newTableBg = document.createElement("img");
            newTableBg.setAttribute("class", "bg-img");
            newTableBg.setAttribute("src", "trapezoid.png");
            newTableBg.setAttribute("height", "100%");
            newTable.appendChild(newTableBg);
        }
        else if (room[i][1]=="trapezoid-i") {
            let newTableBg = document.createElement("img");
            newTableBg.setAttribute("class", "bg-img");
            newTableBg.setAttribute("src", "trapezoid-i.png");
            newTableBg.setAttribute("height", "100%");
            newTable.appendChild(newTableBg);
        }
        else if (room[i][1]=="cluster") {
            let newTableBg = document.createElement("img");
            newTableBg.setAttribute("class", "bg-img");
            newTableBg.setAttribute("src", "cluster.png");
            newTableBg.setAttribute("height", "100%");
            newTable.appendChild(newTableBg);
        }
        else if (room[i][1]=="cluster-i") {
            let newTableBg = document.createElement("img");
            newTableBg.setAttribute("class", "bg-img");
            newTableBg.setAttribute("src", "cluster-i.png");
            newTableBg.setAttribute("height", "100%");
            newTable.appendChild(newTableBg);
        }
        
    }
    console.log(`Tables created`)
    reportRoom();
}


function confirmAndCreateTables() {
    // if no tables
    if (roomTables.length==0) {
        createTables();
    }
    // if tables
    else if (roomTables.length>0) {
        if (confirm('Clear all and create new tables?')) {
            console.log(`Current tables are: ${roomTables}`)
            for (let i = 0; i < roomTables.length; i++) {
                let tableToDelete = document.getElementById(roomTables[i]);
                tableToDelete.remove();
            }
            roomTables = [];
            tableSeats = [];
            randomSequence = [];
            seatsAssigned = false;
            createTables();
            console.log(roomTables.length);
        }
        else {}
    }
}

function addTable() {
    let tableToAdd = document.getElementById("table-input").value;
    let newTable = document.createElement("div");
    // add id to table
    newTable.setAttribute("id", `table${roomTables.length + 1}`);
    // add id to a list to manipulate
    roomTables.push(`table${roomTables.length + 1}`);
    // set position, "relative" ruin the layout
    newTable.style.setProperty('position', "absolute");
    // add class to table
    newTable.classList.add("draggable");
    newTable.classList.add(tableToAdd);
    newTable.tabIndex = 0;
    // make table draggable
    $(newTable).draggable({
        containment: ".tables",
        snap: true,
        cursor: "pointer",
        zIndex: 100,
        // prevent scrolling out of parent div
        scroll: false,
        snapTolerance: 10,
        // update top and left to percentage once dragging stops
        stop: function () {
            var l = ( 100 * parseFloat($(this).position().left / parseFloat($(this).parent().width())) ) + "%" ;
            var t = ( 100 * parseFloat($(this).position().top / parseFloat($(this).parent().height())) ) + "%" ;
            $(this).css("left", l);
            $(this).css("top", t);
            $(this).click();
        }
    });

    // disable snapping for weird table
    if (tableToAdd=="trapezoid" || tableToAdd=="trapezoid-i" || tableToAdd=="cluster" || tableToAdd=="cluster-i") {
        $(newTable).draggable({
            snap: false
            });
    }

    // set table size
    newTable.style.setProperty('height', String((((100/30) * (tables[tableNames.indexOf(tableToAdd)][0]) +"%"))));
    newTable.style.setProperty('width', String((((100/36) * (tables[tableNames.indexOf(tableToAdd)][1]) +"%"))));

    // set table position
    newTable.style.setProperty('left', "0%");
    newTable.style.setProperty('top', "0%");

    // finalize
    let divToInsertBefore = document.querySelector(".to-insert-before");
    let parent = document.querySelector(".tables");
    parent.insertBefore(newTable, divToInsertBefore);

    // set table seat
    for (let j = 0; j < tables[tableNames.indexOf(tableToAdd)][2]; j++) {
        let tableNumber = document.createElement("input");
        tableNumber.setAttribute('value', "");
        if (tableSeats.length==0) {
            tableNumber.setAttribute('id', 'seat1');
            tableSeats.push('seat1');
        }
        else {
            tableNumber.setAttribute('id', `seat${parseInt(tableSeats[tableSeats.length-1].substr(4)) + 1}`);
            tableSeats.push(`seat${parseInt(tableSeats[tableSeats.length-1].substr(4)) + 1}`);
        }
            
        tableNumber.classList.add("seat");
        newTable.appendChild(tableNumber);
    }
        
    if (tableToAdd=="trapezoid") {
        let newTableBg = document.createElement("img");
        newTableBg.setAttribute("class", "bg-img");
        newTableBg.setAttribute("src", "trapezoid.png");
        newTableBg.setAttribute("height", "100%");
        newTable.appendChild(newTableBg);
    }
    else if (tableToAdd=="trapezoid-i") {
        let newTableBg = document.createElement("img");
        newTableBg.setAttribute("class", "bg-img");
        newTableBg.setAttribute("src", "trapezoid-i.png");
        newTableBg.setAttribute("height", "100%");
        newTable.appendChild(newTableBg);
    }
    else if (tableToAdd=="cluster") {
        let newTableBg = document.createElement("img");
        newTableBg.setAttribute("class", "bg-img");
        newTableBg.setAttribute("src", "cluster.png");
        newTableBg.setAttribute("height", "100%");
        newTable.appendChild(newTableBg);
    }
    else if (tableToAdd=="cluster-i") {
        let newTableBg = document.createElement("img");
        newTableBg.setAttribute("class", "bg-img");
        newTableBg.setAttribute("src", "cluster-i.png");
        newTableBg.setAttribute("height", "100%");
        newTable.appendChild(newTableBg);
    }
    console.log(`Table ${tableToAdd} added`)
    reportRoom();
}

function clearTables() {
    console.log(`${roomTables.length} tables to be cleared`);
    if (confirm('Clear all tables?')) {
        for (let i = 0; i < roomTables.length; i++) {
            let tableToDelete = document.getElementById(roomTables[i]);
            tableToDelete.remove();
        }
        roomTables = [];
        tableSeats = [];
        randomSequence = [];
        seatsAssigned = false;
        console.log(`All tables cleared`)
    } else {}
}

let focusedElementId = "";
document.body.addEventListener("click", () => {
    clickedElement = document.activeElement;
    // console.log(clickedElement);
    if (clickedElement.id.substr(0, 5)=="table") {
        focusedElementId = clickedElement.id;
    }
    else {
        focusedElementId = "";
    }
    // console.log(`Focus Id is ${focusedElementId}`)
})



function deleteTable() {
    if (focusedElementId!='') {
        // remove table id from list
        let focusedTable = document.getElementById(focusedElementId);
        roomTables.splice(roomTables.indexOf(focusedElementId),1);
        console.log(roomTables);
        // delete table and seats within
        focusedTable.remove();
        // reset focus
        focusedElementId = "";
        // remove seat id from list
        tableSeats = [];
        let currentSeats = document.querySelectorAll('.seat');
        for (let i = 0 ; i < currentSeats.length; i++) {
            tableSeats.push(currentSeats[i].id)
        }
        console.log(`Current seats are ${tableSeats}`);
    }
}

let randomSequence = [];
let randomNumber;
seatsAssigned = false;
function shuffleSeats() {
    function randomAndAssignSeats() {
        randomSequence = []
        studentInput = document.querySelector('#student-input').value;
        if (studentInput!="" && studentInput!=0 && roomTables.length>0) {
            console.log("random Sequence generated")
            if (studentInput>tableSeats.length) {
                studentInput = tableSeats.length;
            }

            while (randomSequence.length < tableSeats.length) {
                randomNumber = Math.floor(Math.random() * (tableSeats.length));
                if (randomSequence.includes(randomNumber)) {}
                else {
                    randomSequence.push(randomNumber);
                }
            }
            console.log(randomSequence);
            
            for (i = 0; i < studentInput; i++) {
                seatToSetValue = document.querySelector(`#${tableSeats[randomSequence[i]]}`);
                seatToSetValue.value = i+1;
            }
            seatsAssigned = true;
        }
    }
    // check if seats already assigned
    for (i = 0; i < tableSeats.length; i++) {
        if (document.getElementById(tableSeats[i]).value != '') {
            seatsAssigned = true;
            break;
        }
    }
    
    if (seatsAssigned) {
        if (confirm('Clear current numbers and assign new ones?')) {
            for (i = 0; i < tableSeats.length; i++) {
                document.getElementById(tableSeats[i]).value = '';
            }
            randomAndAssignSeats();
        }
        else {}
    }
    else {
        randomAndAssignSeats();
    }
}

function clearSeats() {
    if (seatsAssigned) {
        if (confirm("Clear all seat numbers?")) {
            for (i = 0; i < tableSeats.length; i++) {
                document.getElementById(tableSeats[i]).value = '';
            }
        }
        else {}
    }
    seatsAssigned = false;
    console.log(`All seats cleared`);
    reportRoom();
}


gridToggle.addEventListener("click", () => {
    console.log(gridCellWidth);
    console.log(gridCellWidth);
    console.log(gridCellHeight);
    if (gridToggle.checked) {
        grid.style.visibility = "visible";
        $( ".draggable" ).draggable({ grid: [ gridCellWidth, gridCellHeight ] });
    }
    else {
        grid.style.visibility = "hidden";
        $(".draggable").draggable("option", "grid", false);
    }
});

function reportRoom() {
    console.log(`Current tables are ${roomTables}`);
    console.log(`Current seats are ${tableSeats}`);
}
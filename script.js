const hrs = document.querySelector('.hours');
const mins = document.querySelector('.minutes');
const secs = document.querySelector('.seconds');
const ppBtnClass = document.getElementById("pp-button").className;
const ppBtn = document.querySelector('#pp-button');
const resetBtn = document.querySelector('#reset-button');

let endTime = 0;
let remainingTime = 0;
    // currentTime = Date.now();
    // remainingTime = endTime - currentTime;


ppBtn.addEventListener("click", () => {
    // to play
    if (ppBtnClass == "fa-solid fa-play pp-button") {
        // update btn
        document.getElementById("pp-button").className = "fa-solid fa-pause pp-button";
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
        document.getElementById("pp-button").className = "fa-solid fa-play pp-button";
        clearInterval(intervalId);
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
        startToUpdate.textContent = "Start";
        oneThirdToUpdate.textContent = "1/3";
        twoThirdToUpdate.textContent = "2/3";
        endToUpdate.textContent = "End";
        console.log("Input is empty or not a number")
    } else {
        startToUpdate.textContent = `${startHour}:${startMin}`;
        oneThirdToUpdate.textContent = `${oneThirdHour}:${oneThirdMin}`;
        twoThirdToUpdate.textContent = `${twoThirdHour}:${twoThirdMin}`;
        endToUpdate.textContent = `${endHour}:${endMin}`;
        hrs.textContent = hoursToUpdate;
        mins.textContent = minutesToUpdate;
        secs.textContent = secondsToUpdate;
    }
}




// function countdownTimer() {
//     const currentTime = Date.now();
//     const remainingTime = endTime - currentTime;
//     const angle = (remainingTime / setTime) * 360;

//     // progress indicator
//     if(angle > 180) {
//         semicircles[2].style.display = 'none';
//         semicircles[0].style.transform = 'rotate(180deg)';
//         semicircles[1].style.transform = `rotate(${angle}deg)`;
//     } else {
//         semicircles[2].style.display = 'block';
//         semicircles[0].style.transform = `rotate(${angle}deg)`;
//         semicircles[1].style.transform = `rotate(${angle}deg)`;
//     }

// new Date() => getHours được
// Date.now() + durationInMili => tính toán được





//     





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


// const timerLoop = setInterval(countdownTimer);

// countdownTimer();

// function countdownTimer() {
//     const currentTime = Date.now();
//     const remainingTime = endTime - currentTime;
//     const angle = (remainingTime / setTime) * 360;

//     // progress indicator
//     if(angle > 180) {
//         semicircles[2].style.display = 'none';
//         semicircles[0].style.transform = 'rotate(180deg)';
//         semicircles[1].style.transform = `rotate(${angle}deg)`;
//     } else {
//         semicircles[2].style.display = 'block';
//         semicircles[0].style.transform = `rotate(${angle}deg)`;
//         semicircles[1].style.transform = `rotate(${angle}deg)`;
//     }

//     // timer
//     const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
//     const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
//     const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

//     timer.innerHTML = `
//     <div>${hrs}</div>
//     <div class="colon">:</div>
//     <div>${mins}</div>
//     <div class="colon">:</div>
//     <div>${secs}</div>
    
//     `;

//     // end
//     if(remainingTime < 0) {
//         clearInterval(timerLoop);
//         semicircles[0].style.display = 'none';
//         semicircles[1].style.display = 'none';
//         semicircles[2].style.display = 'none';

//         timer.innerHTML = `
//         <div>00</div>
//         <div class="colon">:</div>
//         <div>00</div>
//         <div class="colon">:</div>
//         <div>00</div>
//     `;
//     }
// }



// function openTab(evt, tabName) {
//     // Declare all variables
//     var i, tabcontent, tablinks;
  
//     // Get all elements with class="tabcontent" and hide them
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
  
//     // Get all elements with class="tablinks" and remove the class "active"
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
  
//     // Show the current tab, and add an "active" class to the button that opened the tab
//     document.getElementById(tabName).style.display = "flex";
//     evt.currentTarget.className += " active";
// }

// const ending = document.querySelector('.end-time');
// showEndTime();
// function showEndTime() {
//     endHours = endTimeDetails.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
//     endMins = endTimeDetails.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
//     ending.innerHTML = `<div>${endHours} : ${endMins}</div>`;
// }

// input > update timeMark + timer

// play
// > first start    > lock input > get fixed endTime > update timer
// > paused         > update timer

// pause > stop update timer


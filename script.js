function tellTime(minuteInput) {
    minuteInput = document.getElementById('minute-input').value;
    second = minuteInput * 60
    mili = second * 1000
    startTime = Date.now()
    endTime = startTime + mili
    console.log(minuteInput);
    console.log(Date());
    console.log(endTime);
}

function updateTimeMark() {
    minuteInput = document.getElementById('minute-input').value;
    second = minuteInput * 60
    mili = second * 1000
    startTime = Date.now()
    endTime = startTime + mili
    startToUpdate = document.getElementById("start-time");
    oneThirdToUpdate = document.getElementById("one-third");
    twoThirdToUpdate = document.getElementById("two-third");
    endToUpdate = document.getElementById("end-time");
    startToUpdate.textContent = "00:00"
    oneThirdToUpdate.textContent = "11:11"
    twoThirdToUpdate.textContent = "22:22"
    endToUpdate.textContent = "33:33"
}

let minuteInput = document.getElementById('minute-input').value;
let startTime;



// // Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();

// const semicircles = document.querySelectorAll('.semicircle');
// const timer = document.querySelector('.timer');
// // const endTime = document.querySelector('.endTime');

// // const minuteInput = document.getElementById("minute-input");
// const minuteInput = 38.5;

// const hoursToMili = Math.floor(minuteInput / 60) * 3600000;
// const minutesToMili = minuteInput * 60000;
// const secondsToMili = ((minuteInput % 1) * 60) * 1000;
// const setTime = hoursToMili + minutesToMili + secondsToMili; //in mili
// const startTime = Date.now();
// const endTime = setTime + startTime;
// const endTimeDetails = new Date(endTime);
// console.log(`${endTimeDetails.toString()}`);


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

function clickPPButton() {
    let ppButtonClass = document.getElementById("pp-button").className;
    if (ppButtonClass == "fa-solid fa-play pp-button") {
        document.getElementById("pp-button").className = "fa-solid fa-pause pp-button";
    }
    else {
        document.getElementById("pp-button").className = "fa-solid fa-play pp-button";
    } 
}

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




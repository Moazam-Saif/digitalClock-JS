document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelector('.options');
    const topBar = document.querySelector('.top-container span');
    const bottomBar = document.querySelector('.bottom-container');
    const timeBar = document.querySelector('.time');
    const lapButton = document.querySelector('.lap');
    const startButton=document.querySelector('.start');
    const stopButton=document.querySelector('.stop');
    const resetButton=document.querySelector('.reset');
    const lapContainer = document.querySelector('.laps');
    const sideBar=document.querySelector('.sidebar');
    const upArrow = document.getElementById('up-arrow');
    const downArrow = document.getElementById('down-arrow');
    const selected=document.querySelector('.selected');

    upArrow.addEventListener('click', () => adjustTime(1));
    downArrow.addEventListener('click', () => adjustTime(-1));

    let elapsed = 0;
    let clockInterval;
    let stopwatchInterval;
    let smallClockInterval;
    let countdownInterval;
    let prevop = "Clock";

    clock();
    selected.textContent=prevop;


    options.addEventListener('click', function(e) {
        let op = e.target.textContent;
        selected.textContent=op;
        if (op === "StopWatch") 
        {

            if(prevop==="Clock")
            {
                stopClock();
                smallClock();
                topBar.style.visibility = "visible";
                bottomBar.style.visibility = "visible";
            } 
            if(prevop==="Alarm")
            {
                stopButton.style.display="initial";
                resetButton.style.display="initial";
            }
            lapButton.style.display="initial";
            e.target.textContent = prevop;
            prevop = op;
            timeBar.innerHTML = formatTime(elapsed);
        } 

        else if (op === "Timer") 
        {
            if (prevop === "Clock") {
                stopClock();
                smallClock();
                bottomBar.style.visibility = "visible";
                lapButton.style.display = "none";
                topBar.style.visibility = "visible";
            }
            else if(prevop==="StopWatch"){
                PauseWatch();
                lapButton.style.display = "none";
            }
            else{
                stopButton.style.display="initial";
                resetButton.style.display="initial";
            }

            createTimerInputs();
            e.target.textContent = prevop;
            prevop = op;
        } 

        else if (op === "Clock") 
        {
            topBar.style.visibility = "hidden";
            bottomBar.style.visibility = "hidden";
            sideBar.style.visibility="hidden";
            e.target.textContent = prevop;
            prevop = op;
            PauseWatch();
            stopSmallClock();

            clock();
        }

        else if(op==="Alarm")
        {
            if(prevop==="Clock")
            {
                stopClock();
                smallClock();
                topBar.style.visibility="visible";
                bottomBar.style.visibility = "visible";
            }
            stopButton.style.display="none";
            lapButton.style.display="none";
            resetButton.style.display="none";
            e.target.textContent=prevop;
            prevop=op;
            createAlarmInputs();
        }
    });

    bottomBar.addEventListener('click', function(e) {
        if (prevop === "StopWatch") {
            if (e.target.textContent === "Start") {
                stopWatch();
            } else if (e.target.textContent === "Stop") {
                PauseWatch();
            } else if (e.target.textContent === "Reset") {
                ResetWatch();
            } else if (e.target.textContent === "Lap") {
                LapWatch();
            }
        } else if (prevop === "Timer") {
            if (e.target.textContent === "Start") {
                startTimer();
            } else if (e.target.textContent === "Stop") {
                stopTimer();
            } else if (e.target.textContent === "Reset") {
                resetTimer();
            }
        }
        else if(prevop==="Alarm"){
            if (e.target.textContent === "Start") {
                activateAlarm();
            }
        }
    });

    function stopWatch() {
        startButton.setAttribute("disabled","true");
        timeBar.innerHTML = formatTime(elapsed);
        stopwatchInterval = setInterval(() => {
            timeBar.innerHTML = formatTime(elapsed+1000);
            elapsed += 1000;
        }, 1000);
        
    }

    function PauseWatch() {
        clearInterval(stopwatchInterval);
        startButton.removeAttribute("disabled");
    }

    function ResetWatch() {
        startButton.removeAttribute("disabled");
        elapsed = 0;
        timeBar.innerHTML = formatTime(elapsed);
        PauseWatch();
    }

    function LapWatch() {
        if (lapContainer) {
            let lap = document.createElement("span");
            lap.innerText = formatTime(elapsed-1000);
            lapContainer.appendChild(lap);
        } else {
            console.error("lapContainer is null. Ensure the element with class 'laps' exists in the DOM.");
        }
    }

    function clock() {
        let time = new Date().toLocaleTimeString();
        timeBar.innerHTML = time;
        clockInterval = setInterval(() => {
            let time = new Date().toLocaleTimeString();
            timeBar.innerHTML = time;
        }, 1000);
    }

    function stopClock() {
        clearInterval(clockInterval);
    }

    function updateSmallTime() {
        const now = new Date();
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const currentTime = now.toLocaleTimeString('en-US', options);
        topBar.textContent = currentTime;
    }

    function smallClock() {
        updateSmallTime(); 
        smallClockInterval = setInterval(updateSmallTime, 1000); // Update continuously at intervals
    }

    function stopSmallClock() {
        clearInterval(smallClockInterval);
    }

    function formatTime(ms) {
        const seconds = Math.floor(ms / 1000) % 60;
        const minutes = Math.floor(ms / 60000) % 60;
        const hours = Math.floor(ms / 3600000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    function createTimerInputs(){
        sideBar.style.visibility="visible";
        timeBar.textContent='';
        const timeUnits = [
            { id: "hours", max: 99 },
            { id: "minutes", max: 59 },
            { id: "seconds", max: 59 },
        ];
    
    
        timeUnits.forEach((unit) => {
 
            const input = document.createElement("input");
            input.className="timer-inputs";
            input.type = "number";
            input.id = unit.id;
            input.min = 0;
            input.max = unit.max;
            input.value = input.min.toString().padStart(2,'0');;
   
            timeBar.appendChild(input);
            input.addEventListener('focus', () => {
                activeInput = input;
            });
        });
    }

    function adjustTime(amount) {
        const inputId=activeInput.id;
        if (activeInput && inputId!=="alarm-am-pm") 
        {
            let value = parseInt(activeInput.value) || 0;
            value += amount;
            if(value<activeInput.min)
                value=activeInput.max;
            if(value>activeInput.max)
                value=activeInput.min;
            activeInput.value = value.toString().padStart(2,'0');
        }
        else if(activeInput.id="alarm-am-pm"){
            toggleAmPm();
        }
    }

    function startTimer() {
        startButton.setAttribute("disabled","true");
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        let totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        // Hide arrows and disable inputs
        const arrowButtons = document.querySelectorAll(".arrow");
        arrowButtons.forEach(button => button.style.display = "none");
        const inputs = document.querySelectorAll(".unit input");
        inputs.forEach(input => input.disabled = true);

        countdownInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                document.getElementById('hours').value = "00";
                document.getElementById('minutes').value = "00";
                document.getElementById('seconds').value = "00";
                alert("Time's up!");
                startButton.removeAttribute("disabled");
                arrowButtons.forEach(button => button.style.visibility="hidden");
                return;
            }

            totalSeconds--;

            const hrs = Math.floor(totalSeconds / 3600);
            const mins = Math.floor((totalSeconds % 3600) / 60);
            const secs = totalSeconds % 60;

            document.getElementById('hours').value = String(hrs).padStart(2, '0');
            document.getElementById('minutes').value = String(mins).padStart(2, '0');
            document.getElementById('seconds').value = String(secs).padStart(2, '0');
        }, 1000);
    }

    function createAlarmInputs() {
        sideBar.style.visibility="visible";
        timeBar.textContent = ""; // Clear any existing inputs
        const timeUnits = [
            { id: "alarm-hours", max: 12,min:1 },
            { id: "alarm-minutes", max: 59,min:0 }];
        
        timeUnits.forEach((unit) => {
            const input = document.createElement("input");
            input.className="timer-inputs";
            input.type = "number";
            input.id = unit.id;
            input.min = unit.min.toString().padStart(2,'0');;
            input.max = unit.max;
            input.value = unit.min.toString().padStart(2,'0');;

            timeBar.appendChild(input);
            input.addEventListener('focus', () => {
                activeInput = input;
                });
            });

        const input3 = document.createElement("input");
        input3.className="timer-inputs";
        input3.type = "text";
        input3.id = "alarm-am-pm";
        input3.value = "AM";
        input3.setAttribute('readonly',true);
       
        timeBar.appendChild(input3);
        input3.addEventListener('focus', () => {
            activeInput = input3;
        });


    }

    function toggleAmPm() {
        const amPmInput = document.getElementById("alarm-am-pm");
        amPmInput.value = amPmInput.value === "AM" ? "PM" : "AM";
    }

    function activateAlarm() {
        const alarmHours = document.getElementById("alarm-hours").value;
        const alarmMinutes = document.getElementById("alarm-minutes").value;
        const alarmAmPm = document.getElementById("alarm-am-pm").value;

        alert(`Alarm set for ${alarmHours}:${alarmMinutes} ${alarmAmPm}`);
        
        const alarmTime = `${alarmHours}:${alarmMinutes} ${alarmAmPm}`;

        const alarmInterval = setInterval(() => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const amPm = hours >= 12 ? "PM" : "AM";

            hours = hours % 12 || 12; // Convert 24-hour format to 12-hour
            const currentTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amPm}`;

            if (currentTime === alarmTime) {
                clearInterval(alarmInterval);
                alert("ALARM! Time to wake up!");
            }
        }, 1000);
    }
    
});


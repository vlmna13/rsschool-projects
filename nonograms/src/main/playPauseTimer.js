import { settings } from "../../index.js";

export function playPauseTimer() {
    let minutes = 0;
    let seconds = 0;
    const timerWrapper = document.querySelector('.timer-wrapper');
    if(settings.isGameStarted == false){
        settings.isGameStarted = true;
        settings.intervalId = setInterval(() => {
            seconds = seconds + 1;
            timerWrapper.textContent = 'Time: '+ minutes + ':' + seconds;
            if(seconds === 59){
                minutes = minutes + 1;
                seconds = 0;
            }
        }, 1000)
    }

}
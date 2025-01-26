import { settings } from "../../index.js";

export function playPauseTimer() {
    const timerWrapper = document.querySelector('.timer-wrapper');
    
    if(settings.isGameStarted == false){
        settings.isGameStarted = true;
        settings.intervalId = setInterval(() => {
            settings.seconds = settings.seconds + 1;
            timerWrapper.textContent = 'Time: '+ settings.minutes + ':' + settings.seconds;
            if(settings.seconds === 59){
                settings.minutes = settings.minutes + 1;
                settings.seconds = 0;
            }
        }, 1000)
    }

}
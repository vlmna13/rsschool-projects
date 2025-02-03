import { settings } from "../../index.js";

export function playPauseTimer() {
    const timerWrapper = document.querySelector('.timer-wrapper');
        if(settings.isGameStarted == false){
            settings.isGameStarted = true;
            settings.intervalId = setInterval(() => {
                settings.seconds = settings.seconds + 1;
                if(settings.seconds === 59){
                    settings.minutes = settings.minutes + 1;
                    settings.seconds = 0;
                }
                const formattedMinutes = settings.minutes < 10 ? '0' + settings.minutes : settings.minutes;
                const formattedSeconds = settings.seconds < 10 ? '0' + settings.seconds : settings.seconds;
                timerWrapper.textContent = formattedMinutes + ' : ' + formattedSeconds;
            }, 1000);
        }
    // function startTimer() {

    // }


    // document.addEventListener('visibilitychange', () => {
    //     if (document.hidden) {
    //         clearInterval(settings.intervalId);
    //         settings.isGameStarted = false;
    //     } else {
    //         if (!settings.isGameStarted) {
    //             settings.isGameStarted = true;
    //             startTimer();
    //         }
    //     }
    // });

}
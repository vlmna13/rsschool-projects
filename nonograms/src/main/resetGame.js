import { settings } from "../../index.js";
import { removeRightClick } from "./createNonogramField.js";
import { userClick } from "./userClick.js";

export function resetGame() {
    const allCeils = document.querySelectorAll('.ceil');
    if(!settings.blockedCeil){
        settings.blockedCeil = true;
        settings.isGameStarted = false;
        settings.intervalId = clearInterval(settings.intervalId);
        settings.seconds = 0;
        settings.minutes = 0;
        const timerWrapper = document.querySelector('.timer-wrapper');
        timerWrapper.textContent = 'Time:  0 : 0';
    }
    allCeils.forEach(el => {
        el.classList.remove('colored');
        el.textContent = '';
        el.addEventListener('click', userClick);
        el.addEventListener('contextmenu', removeRightClick)
    });
    for(let i = 0; i < settings.userMatrix.length; i++){
        for(let j = 0; j < settings.userMatrix[i].length; j++){
            settings.userMatrix[i][j] = 0;
        }
    }


    // timerWrapper.textContent = 'Time:  0 : 0'; 
    // console.log('reset  :' + settings)
}
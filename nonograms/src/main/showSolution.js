import { nonogramsList } from "../nonogramsList.js";
import { settings } from "../../index.js";

export function showSolution() {
    const allCeils = document.querySelectorAll('.ceil');
    const level = document.querySelector('.level.active').textContent;
    const variant = document.querySelector('.variant.active').textContent;
    const matrix = nonogramsList[level][variant].flat();
    settings.isGameStarted = false;
    settings.intervalId = clearInterval(settings.intervalId);
    const timerWrapper = document.querySelector('.timer-wrapper');
    timerWrapper.textContent = 'Timer:  0 : 0'; 
    allCeils.forEach((el, index) => {
        if(matrix[index] === 1){
            el.classList.add('colored');
            el.textContent = '';
        } else {
            el.classList.remove('colored');
            el.textContent = '';
        }
    });

}
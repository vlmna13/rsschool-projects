import { nonogramsList } from "../nonogramsList.js";
import { settings } from "../../index.js";
import { userClick } from "./userClick.js";
import { rightClick } from "./rightClick.js";
import { removeRightClick } from "./createNonogramField.js";

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
        el.classList.remove('colored');
        el.textContent = '';
        el.removeEventListener('click', userClick);
        el.removeEventListener('contextmenu', removeRightClick);
    });

    matrix.forEach((value, index) => {
        setTimeout(() => {
            if (value === 1) {
                allCeils[index].classList.add('colored');
            }
        }, index * 50); // Adjust the delay as needed
    });

}
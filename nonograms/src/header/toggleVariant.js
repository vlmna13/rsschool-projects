import { nonogramsList } from "../nonogramsList.js";
import { createNonogramField } from "../main/createNonogramField.js";
import { createLeftClue } from "../main/createLeftClue.js";
import { createUpClue } from "../main/createUpClue.js";
import { settings } from "../../index.js";


export function toggleVariant(event) {
    const variantsWrapper = document.querySelector('.variants-wrapper');
    const allVariants = variantsWrapper.querySelectorAll('button');
    if(event.target.classList.contains('active')) {
        return;
    }
    allVariants.forEach(el => {
        el.classList.remove('active');
    })
    event.target.classList.add('active');
    settings.variant = event.target.textContent;
    let variant = settings.variant;
    const upside = document.querySelector('.up-side');
    upside.innerHTML = '';
    const downside = document.querySelector('.down-side');
    downside.innerHTML = '';
    let level = settings.level;
    settings.matrix = nonogramsList[level][variant];
    let matrix = settings.matrix;
    settings.blockedCeil = true;
    createUpClue(matrix);
    createLeftClue(matrix);
    createNonogramField(matrix);
    settings.isGameStarted = false;
    settings.intervalId = clearInterval(settings.intervalId);
    const timerWrapper = document.querySelector('.timer-wrapper');
    timerWrapper.textContent = '00 : 00'; 
    settings.seconds = 0;
    settings.minutes = 0;
}
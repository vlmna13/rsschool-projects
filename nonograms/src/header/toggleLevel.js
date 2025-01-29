import { nonogramsList } from "../nonogramsList.js";
import { createVariantsButtons } from "./createVariantsButtons.js";
import { settings } from "../../index.js";
import { createLeftClue } from "../main/createLeftClue.js";
import { createUpClue } from "../main/createUpClue.js";
import { createNonogramField } from "../main/createNonogramField.js";


export function toggleLevel(event) {
    const levelsWrapper = document.querySelector('.levels-wrapper');
    const levels = levelsWrapper.querySelectorAll('button');
    settings.level = event.target.textContent;
    settings.variant = Object.keys(nonogramsList[settings.level])[0];
    if(event.target.classList.contains('.active')) {
        return;
    }
    levels.forEach(el => {
        el.classList.remove('active');
    })
    event.target.classList.add('active');
    const level = settings.level;
    settings.matrix = nonogramsList[settings.level][settings.variant];
    settings.blockedCeil = true;
    createVariantsButtons(level);
    const upside = document.querySelector('.up-side');
    upside.innerHTML = '';
    const downside = document.querySelector('.down-side');
    downside.innerHTML = '';
    createUpClue(settings.matrix);
    createLeftClue(settings.matrix);
    createNonogramField(settings.matrix);
    settings.isGameStarted = false;
    settings.intervalId = clearInterval(settings.intervalId);
    const timerWrapper = document.querySelector('.timer-wrapper');
    settings.seconds = 0;
    settings.minutes = 0;
    timerWrapper.textContent = '00 : 00'; 
}
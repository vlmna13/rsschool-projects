import { settings } from "../../index.js";
import { nonogramsList } from "../nonogramsList.js";
import { createLeftClue } from "./createLeftClue.js";
import { createNonogramField } from "./createNonogramField.js";
import { createUpClue } from "./createUpClue.js";
import { createVariantsButtons } from "../header/createVariantsButtons.js";

export function randomGame() {
    let allLevels = Object.keys(nonogramsList);
    let randomLevel = Math.floor(Math.random() * (allLevels.length - 0) + 0);
    let level = allLevels[randomLevel];
    let allVariants = Object.keys(nonogramsList[level]);
    let randomVariant = Math.floor(Math.random() * (allVariants.length - 0) + 0);
    let variant = allVariants[randomVariant];
    while(settings.variant === variant) {
        randomVariant = Math.floor(Math.random() * (allVariants.length - 0) + 0);
        variant = allVariants[randomVariant];
    }
    settings.level = level;
    settings.variant = variant;
    settings.matrix =  nonogramsList[level][variant];
    const allButtnLevel = document.querySelectorAll('.level');
    allButtnLevel.forEach(el => {
        el.classList.remove('active');
        if(el.classList.contains(level)) {
            el.classList.add('active');
            createVariantsButtons(level);
            createUpClue(settings.matrix);
            createLeftClue(settings.matrix);
            createNonogramField(settings.matrix);
            settings.userMatrix = Array.from({ length: settings.matrix.length }, () => Array(settings.matrix.length).fill(0));
        }
    });
    settings.isGameStarted = false;
    settings.intervalId = clearInterval(settings.intervalId);
    settings.seconds = 0;
    settings.minutes = 0;
    const timerWrapper = document.querySelector('.timer-wrapper');
    timerWrapper.textContent = '00 : 00'; 
}
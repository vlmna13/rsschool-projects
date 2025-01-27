import { createLeftClue } from "./createLeftClue.js";
import { createNonogramField } from "./createNonogramField.js";
import { createUpClue } from "./createUpClue.js";
import { createVariantsButtons } from "../header/createVariantsButtons.js";
import { settings } from "../../index.js";

export function previousGame() {
    if(!JSON.parse(localStorage.getItem('settings'))){
        alert('you do not have saved game')
        return;
    } 
    let savedSettings = JSON.parse(localStorage.getItem('settings'));
    Object.keys(savedSettings).forEach(key => {
        settings[key] = savedSettings[key];
    });
    const allLevels = document.querySelectorAll('.level');
    allLevels.forEach(el=> {
        el.classList.remove('active');
        if(el.classList.contains(settings.level)) {
            el.classList.add('active');
            createVariantsButtons(settings.level);
            createUpClue(settings.matrix);
            createLeftClue(settings.matrix);
            createNonogramField(settings.matrix);
            settings.minutes = savedSettings.minutes;
            settings.seconds = savedSettings.seconds;
            const timerWrapper = document.querySelector('.timer-wrapper');
            const formattedMinutes = settings.minutes < 10 ? '0' + settings.minutes : settings.minutes;
            const formattedSeconds = settings.seconds < 10 ? '0' + settings.seconds : settings.seconds;
            timerWrapper.textContent = 'Time: ' + formattedMinutes + ' : ' + formattedSeconds;
            // timerWrapper.textContent = 'Time:  ' + settings.minutes + ' : ' + settings.seconds;
            settings.userMatrix = savedSettings.userMatrix;
            const allCeils = document.querySelectorAll('.ceil');
            allCeils.forEach(el => {
                const row = el.dataset.row;
                const col = el.dataset.col;
                if (settings.userMatrix[row][col] === 1) {
                    el.classList.add('colored');
                }
                if(settings.userMatrix[row][col] == 'X') {
                    el.textContent = 'X';
                }
            });
        }
    });
}
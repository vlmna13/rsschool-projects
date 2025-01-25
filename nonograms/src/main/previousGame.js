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
    const allCeils = document.querySelectorAll('.ceil');
    allLevels.forEach(el=> {
        el.classList.remove('active');
        if(el.classList.contains(settings.level)) {
            el.classList.add('active');
            createVariantsButtons(settings.level);
            createUpClue(settings.matrix);
            createLeftClue(settings.matrix);
            createNonogramField(settings.matrix);
            const timerWrapper = document.querySelector('.timer-wrapper');
            timerWrapper.textContent = 'Time:  ' + settings.minutes + ' : ' + settings.seconds;
            settings.isGameStarted = false;
            settings.intervalId = clearInterval(settings.intervalId);
            
        }
    })
    console.log(settings)
}
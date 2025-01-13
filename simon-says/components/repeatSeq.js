import { defaultParameters } from "../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "./keyboardData.js";
import { lightUp } from "./lightUp.js";
import { allowInput } from "./allowInput.js";
import { checkWin } from "./creators/checkWin.js";


export function repeatSeq() {
    const repeat = document.querySelector('.repeat');
    const field = document.querySelector('.field');
    field.textContent = '';
    defaultParameters.isGamestarted = false;
    defaultParameters.clue = 0;
    allowInput();
    lightUp();
    if(defaultParameters.clue === 0) {
        repeat.style.color = 'gray';
        repeat.removeEventListener('click',repeatSeq)
    }
}
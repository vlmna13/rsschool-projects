import { defaultParameters } from "../../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "../keyboardData.js";
import { repeatSeq } from "../repeatSeq.js";
import { createRound } from "./creatRound.js";
import { lightUp } from "../lightUp.js";
import { allowInput } from "../allowInput.js";

export function createLevel(){
    const field = document.querySelector('.field');
    const fBack = document.querySelector('.feed-back');
    fBack.textContent = '';
    field.textContent = '';
    defaultParameters.isGamestarted = false;
    const score = document.querySelector('.score');
    score.textContent = 'round ' + defaultParameters.round + ' / 5';
    defaultParameters.sequence.length = 0;
    createRound();
    const repeat = document.querySelector('.repeat');
    repeat.textContent = 'repeat sequence';
    repeat.removeEventListener('click', createLevel)
    if(!repeat.classList.contains('visible')) {
        repeat.classList.add('visible');
    }
    repeat.style.color = '';
    repeat.addEventListener('click', repeatSeq)
    lightUp();
    allowInput();
}
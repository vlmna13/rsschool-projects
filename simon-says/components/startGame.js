import { defaultParameters } from "../index.js";
import { createRound } from "./creators/creatRound.js";
import { allowInput } from "./allowInput.js";
import { lightUp } from "./lightUp.js";

export function startGame() {
    const field = document.querySelector('.field');
    field.innerText = '';
    defaultParameters.round = 0;
    defaultParameters.round += 1;
    defaultParameters.isGamestarted = false;
    const score = document.querySelector('.score');
    score.innerText = 'round ' + defaultParameters.round + ' / 5';
    defaultParameters.sequence.length = 0;
    createRound();
    const newGame = document.querySelector('.start');
    newGame.innerText = 'new game';
    const repeat = document.querySelector('.repeat');
    if(!repeat.classList.contains('visible')) {
        repeat.classList.add('visible');
    }
    console.log(defaultParameters.sequence);
    lightUp();
    allowInput();
}
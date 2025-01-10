import { defaultParameters } from "../index.js";
import { createRound } from "./creators/creatRound.js";

export function startGame() {
    defaultParameters.round = 0;
    defaultParameters.round += 1;
    const score = document.querySelector('.score');
    score.innerText = 'round ' + defaultParameters.round + ' / 5';
    defaultParameters.sequence.length = 0;
    console.log(defaultParameters.sequence)
    createRound();
    const newGame = document.querySelector('.start');
    newGame.innerText = 'new game';
}
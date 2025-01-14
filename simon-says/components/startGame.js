import { defaultParameters } from "../index.js";
import { createRound } from "./creators/creatRound.js";
import { allowInput } from "./allowInput.js";
import { lightUp } from "./lightUp.js";
import { repeatSeq } from "./repeatSeq.js";

export function startGame() {
    const field = document.querySelector('.field');
    const fBack = document.querySelector('.feed-back');
    fBack.textContent = '';
    field.textContent = '';
    defaultParameters.round = 1;
    defaultParameters.isGamestarted = false;
    const score = document.querySelector('.score');
    score.textContent = 'round ' + defaultParameters.round + ' / 5';
    defaultParameters.sequence.length = 0;
    createRound();
    const newGame = document.querySelector('.start');
    newGame.textContent = 'new game';
    const easy = document.querySelector('.easy');
    const medium = document.querySelector('.medium');
    const hard = document.querySelector('.hard');
    const repeat = document.querySelector('.repeat');
    if(!repeat.classList.contains('visible')) {
        repeat.classList.add('visible');   
    }
    repeat.style.color = '';
    repeat.addEventListener('click', repeatSeq)
    lightUp();
    allowInput();
    function resetGame(){
        easy.disabled = false;
        medium.disabled = false;
        hard.disabled = false;
        repeat.classList.remove('visible');
        repeat.textContent = 'repeat sequence';
        newGame.textContent = 'start game';
        newGame.removeEventListener('click', resetGame)
        newGame.addEventListener('click', startGame)
    }
    newGame.removeEventListener('click', startGame);
    newGame.addEventListener('click', resetGame);
}
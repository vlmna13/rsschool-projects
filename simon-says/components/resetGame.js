import { defaultParameters } from "../index.js";
import { startGame } from "./startGame.js";

export    function resetGame(){
    const newGame = document.querySelector('.start');
    const easy = document.querySelector('.easy');
    const medium = document.querySelector('.medium');
    const hard = document.querySelector('.hard');
    const repeat = document.querySelector('.repeat');
    const fback = document.querySelector('.feed-back');
    defaultParameters.mistakes = 2;
        easy.disabled = false;
        medium.disabled = false;
        hard.disabled = false;
        defaultParameters.round = 1;
        fback.textContent = '';
        repeat.classList.remove('visible');
        repeat.textContent = 'repeat sequence';
        newGame.textContent = 'start game';
        newGame.removeEventListener('click', resetGame);
        newGame.addEventListener('click', startGame);
    }
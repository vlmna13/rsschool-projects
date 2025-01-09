import { startGame } from "../startGame.js";
import { toggleLevel } from "./toggleLevel.js";
import { defaultParameters } from "../../index.js";

export function createHeader() {
    const body = document.querySelector('body');
    const header = document.createElement('header');
    header.classList.add('header-wrapper');
    body.appendChild(header);

    const levelWrapper = document.createElement('div');
    //levelWrapper
    levelWrapper.classList.add('level-wrapper');
    const levelEasy = document.createElement('button');
    levelEasy.classList.add('easy', 'active');
    levelEasy.innerHTML = 'easy';
    // levelEasy.style.background = '#90EE90';
    levelEasy.addEventListener('click', toggleLevel);

    const levelMedium = document.createElement('button');
    levelMedium.classList.add('medium');
    levelMedium.innerHTML = 'medium';
    levelMedium.addEventListener('click', toggleLevel);

    const levelHard = document.createElement('button');
    levelHard.classList.add('hard');
    levelHard.innerHTML = 'hard';
    levelHard.addEventListener('click', toggleLevel);
    levelWrapper.appendChild(levelEasy);
    levelWrapper.appendChild(levelMedium);
    levelWrapper.appendChild(levelHard);
    header.appendChild(levelWrapper);
    //score
    const score = document.createElement('p');
    score.classList.add('score');
    score.innerText = 'round 0/5';
    header.appendChild(score);
    //Start
    const buttonStart = document.createElement('button');
    buttonStart.classList.add('start', 'easy');
    buttonStart.innerText = 'start game';
    buttonStart.addEventListener('click', startGame);
    header.appendChild(buttonStart);

    //repeat
    const repeatSeq = document.createElement('button');
    repeatSeq.classList.add('repeat', 'easy');
    repeatSeq.innerText = 'repeat sequence';
    header.appendChild(repeatSeq);
    return { header, levelEasy, levelHard, levelMedium, levelWrapper };
}
import { defaultParameters } from "../index.js";
import { changeData } from "./changeData.js";
import { createKeyboard } from "./creators/createKeyBoard.js";

export function toggleLevel(event) {
    const levelWrapper = document.querySelector('.level-wrapper');
    const buttonStart = document.querySelector('.start');
    const repeatSeq = document.querySelector('.repeat');
    let allLevels = Array.from(levelWrapper.childNodes);
    allLevels.forEach(el => {
        el.classList.remove('active');
    })
    event.target.classList.add('active');
    defaultParameters.level = event.target.textContent;
    buttonStart.classList.remove(buttonStart.classList[1]);
    buttonStart.classList.add(defaultParameters.level);
    repeatSeq.classList.remove(repeatSeq.classList[1]);
    repeatSeq.classList.add(defaultParameters.level);
    repeatSeq.classList.remove('visible');
    const field = document.querySelector('.field');
    field.classList.remove(field.classList[1]);
    field.classList.add(defaultParameters.level);
    changeData();
    createKeyboard();
    const allKeys = document.querySelectorAll('.key');
    allKeys.forEach(key => {
        key.classList.remove(key.classList[1]);
        key.classList.add(defaultParameters.level);
    });
    defaultParameters.round = 0;
    defaultParameters.sequence = [];
    const score = document.querySelector('.score');
    score.textContent = 'round ' + defaultParameters.round + ' / 5';
    field.textContent = '';
    const fback = document.querySelector('.feed-back');
    fback.textContent = '';
}
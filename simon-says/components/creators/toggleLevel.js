import { defaultParameters } from "../../index.js";

export function toggleLevel(event) {
    const levelWrapper = document.querySelector('.level-wrapper');
    const buttonStart = document.querySelector('.start');
    const repeatSeq = document.querySelector('.repeat');
    let allLevels = Array.from(levelWrapper.childNodes);
    allLevels.forEach(el => {
        el.classList.remove('active');
    })
    event.target.classList.add('active');
    defaultParameters.level = event.target.innerText;
    buttonStart.classList.remove(buttonStart.classList[1]);
    buttonStart.classList.add(defaultParameters.level);
    repeatSeq.classList.remove(repeatSeq.classList[1]);
    repeatSeq.classList.add(defaultParameters.level);
}
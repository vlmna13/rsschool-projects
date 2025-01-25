import { createSetttingsWrapper } from "./createSettingsWrapper.js";

export function createMain() {
    const body = document.querySelector('body');
    const main = document.createElement('main');
    main.classList.add('main');
    body.appendChild(main);

    createSetttingsWrapper();

    const timerWrapper = document.createElement('div');
    timerWrapper.classList.add('timer-wrapper');
    main.appendChild(timerWrapper);
    let second = 0;
    let minute = 0;
    timerWrapper.textContent = 'Time    ' + minute + ' : ' + second;

    const nonogramWrapper = document.createElement('div');
    nonogramWrapper.classList.add('nonogram-wrapper');
    main.appendChild(nonogramWrapper); 

    const upSide = document.createElement('div');
    upSide.classList.add('up-side');
    nonogramWrapper.appendChild(upSide);

    const downSide = document.createElement('div');
    downSide.classList.add('down-side');
    nonogramWrapper.appendChild(downSide);
}
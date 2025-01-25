import { createSetttingsWrapper } from "./createSettingsWrapper.js";
import { settings } from "../../index.js";

export function createMain() {
    const body = document.querySelector('body');
    const main = document.createElement('main');
    main.classList.add('main');
    body.appendChild(main);

    createSetttingsWrapper();

    const timerWrapper = document.createElement('div');
    timerWrapper.classList.add('timer-wrapper');
    main.appendChild(timerWrapper);
    timerWrapper.textContent = 'Time   ' + settings.minutes + ' : ' + settings.seconds;

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
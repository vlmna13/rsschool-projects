import { createSetttingsWrapper } from "./createSettingsWrapper.js";
import { settings } from "../../index.js";
import { switchTheme } from "./switchTheme.js";

export function createMain() {
    const body = document.querySelector('body');
    const main = document.createElement('main');
    main.classList.add('main');
    body.appendChild(main);

    createSetttingsWrapper();
    const themeTimeWrapper = document.createElement('div');
    main.appendChild(themeTimeWrapper)
    themeTimeWrapper.classList.add('theme-timer');

    const bamboo = document.createElement('img');
    bamboo.src = './images/bamboo.svg';
    bamboo.alt = 'bamboo';
    bamboo.classList.add('bamboo', 'active');
    themeTimeWrapper.appendChild(bamboo);
    bamboo.addEventListener('click', switchTheme);

    const timerWrapper = document.createElement('div');
    timerWrapper.classList.add('timer-wrapper');
    themeTimeWrapper.appendChild(timerWrapper);
    // timerWrapper.textContent = 'Time   ' + settings.minutes + ' : ' + settings.seconds;
    const formattedMinutes = settings.minutes < 10 ? '0' + settings.minutes : settings.minutes;
    const formattedSeconds = settings.seconds < 10 ? '0' + settings.seconds : settings.seconds;
    timerWrapper.textContent = formattedMinutes + ':' + formattedSeconds;

    const paifang = document.createElement('img');
    paifang.src = './images/paifang.svg';
    paifang.alt = 'paifang';
    paifang.classList.add('paifang');
    themeTimeWrapper.appendChild(paifang);
    paifang.addEventListener('click', switchTheme);

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
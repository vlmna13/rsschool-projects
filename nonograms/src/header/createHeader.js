import { nonogramsList } from "../nonogramsList.js";
import { createLevelsButtons } from "./createLevelsButtons.js";
import { createVariantsButtons } from "./createVariantsButtons.js";
import { toggleLevel } from "./toggleLevel.js";
import { settings } from "../../index.js";
import { toggleSilence } from "./toggleSilence.js";



export function createHeader() {
    const body = document.querySelector('body');
    const leafContainer = document.createElement('div');
    const main = document.querySelector('.main');
    const header = document.createElement('header');
    header.classList.add('header');
    body.insertBefore(header, main);
    body.insertBefore(leafContainer, header);
    leafContainer.classList.add('leaf-container');
    const sound = document.createElement('img');
    sound.classList.add('sound');
    sound.src = './images/sound.svg';
    sound.alt = 'sound';
    header.appendChild(sound);
    sound.addEventListener('click', toggleSilence)
    const levelsWrapper = document.createElement('div');
    levelsWrapper.classList.add('levels-wrapper');
    header.appendChild(levelsWrapper);
    const variantsWrapper = document.createElement('div');
    variantsWrapper.classList.add('variants-wrapper');
    header.appendChild(variantsWrapper);
    createLevelsButtons(levelsWrapper);
    createVariantsButtons('easy');
}

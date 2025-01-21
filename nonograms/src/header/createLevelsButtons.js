import { nonogramsList } from "../nonogramsList.js";
import { toggleLevel } from "./toggleLevel.js";
import { createVariantsButtons } from "./createVariantsButtons.js";

export function createLevelsButtons(wrapper) {
    const buttonsList = Object.keys(nonogramsList);
    const levelsWrapper = wrapper;
    buttonsList.forEach(el => {
        const buttonLevel = document.createElement('button');
        buttonLevel.classList.add('level', el)
        if( el === 'easy') {
            buttonLevel.classList.add('active');
            createVariantsButtons('easy');
        }
        buttonLevel.textContent = el;
        levelsWrapper.appendChild(buttonLevel);
        buttonLevel.addEventListener('click', toggleLevel)
    });

}
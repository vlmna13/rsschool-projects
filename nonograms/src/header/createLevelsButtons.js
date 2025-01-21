import { nonogramsList } from "../nonogramsList.js";
import { toggleLevel } from "./toggleLevel.js";

export function createLevelsButtons(wrapper) {
    const buttonsList = Object.keys(nonogramsList);
    const levelsWrapper = wrapper;
    buttonsList.forEach(el => {
        const buttonLevel = document.createElement('button');
        buttonLevel.classList.add(el)
        if( el === 'easy') {
            buttonLevel.classList.add('active')
        }
        buttonLevel.textContent = el;
        levelsWrapper.appendChild(buttonLevel);
        buttonLevel.addEventListener('click', toggleLevel)
    })
}
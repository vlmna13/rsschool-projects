import { nonogramsList } from "../nonogramsList.js";
import { toggleLevel } from "./toggleLevel.js";
import { createVariantsButtons } from "./createVariantsButtons.js";
import { createNonogramField } from "../main/createNonogramField.js";
import { settings } from "../../index.js";
import { createLeftClue } from "../main/createLeftClue.js";
import { createUpClue } from "../main/createUpClue.js";

export function createLevelsButtons(wrapper) {
    const buttonsList = Object.keys(nonogramsList);
    const levelsWrapper = wrapper;
    settings.variant = Object.keys(nonogramsList[settings.level])[0];
    settings.matrix = nonogramsList[settings.level][settings.variant];
    let matrix = settings.matrix;
    buttonsList.forEach(el=> {
        const buttonLevel = document.createElement('button');
        buttonLevel.classList.add('level', el)
        if (el === settings.level) {
            buttonLevel.classList.add('active');
            createVariantsButtons(settings.level);
        }
        buttonLevel.textContent = el;
        levelsWrapper.appendChild(buttonLevel);
        buttonLevel.addEventListener('click', toggleLevel)
    });
}
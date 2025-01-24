import { nonogramsList } from "../nonogramsList.js";
import { createLevelsButtons } from "./createLevelsButtons.js";
import { createVariantsButtons } from "./createVariantsButtons.js";
import { toggleLevel } from "./toggleLevel.js";
import { settings } from "../../index.js";




export function createHeader() {
    const body = document.querySelector('body');
    const main = document.querySelector('.main');
    const header = document.createElement('header');
    header.classList.add('header');
    body.insertBefore(header, main);
    const levelsWrapper = document.createElement('div');
    levelsWrapper.classList.add('levels-wrapper');
    header.appendChild(levelsWrapper);
    const variantsWrapper = document.createElement('div');
    variantsWrapper.classList.add('variants-wrapper');
    header.appendChild(variantsWrapper);
    createLevelsButtons(levelsWrapper);
    createVariantsButtons('easy');
}

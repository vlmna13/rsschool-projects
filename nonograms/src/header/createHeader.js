import { nonogramsList } from "../nonogramsList.js";
import { createLevelsButtons } from "./createLevelsButtons.js";
import { toggleLevel } from "./toggleLevel.js";


export function createHeader() {
    const body = document.querySelector('body');
    const header = document.createElement('header');
    header.classList.add('header');
    body.appendChild(header);
    const levelsWrapper = document.createElement('div');
    levelsWrapper.classList.add('levels-wrapper');
    header.appendChild(levelsWrapper);
    const variantsWrapper = document.createElement('div');
    variantsWrapper.classList.add('variants-wrapper');
    header.appendChild(variantsWrapper);
    createLevelsButtons(levelsWrapper);
}

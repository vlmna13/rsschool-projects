import { nonogramsList } from "../nonogramsList.js";
import { toggleVariant } from "./toggleVariant.js";
import { settings } from "../../index.js";
import { createLeftClue } from "../main/createLeftClue.js";
import { createUpClue } from "../main/createUpClue.js";
import { createNonogramField } from "../main/createNonogramField.js";

export function createVariantsButtons(data) {
    const variants = Object.keys(nonogramsList[data]);
    const header = document.querySelector('.header');
    const variantsWrapper = document.querySelector('.variants-wrapper');
    variantsWrapper.innerHTML = '';
    const upside = document.querySelector('.up-side');
    upside.innerHTML = '';
    const downside = document.querySelector('.down-side');
    downside.innerHTML = '';
    settings.matrix = nonogramsList[data][settings.variant];
    settings.blockedCeil = true;
    variants.forEach(el => {
        const variantButton = document.createElement('button');
        variantsWrapper.appendChild(variantButton);
        variantButton.classList.add('variant', el);
        variantButton.textContent = el;
        variantButton.addEventListener('click', toggleVariant);
        if(el === settings.variant) {
            variantButton.classList.add('active');
            let userMatrix = Array.from({ length: settings.matrix.length }, () => Array(settings.matrix.length).fill(0));
            settings.userMatrix = userMatrix;
        }
    })

    settings.seconds = 0;
    settings.minutes = 0;
    settings.intervalId = clearInterval(settings.intervalId);
    settings.isGameStarted = false;
}
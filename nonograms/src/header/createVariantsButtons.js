import { nonogramsList } from "../nonogramsList.js";
import { toggleVariant } from "./toggleVariant.js";
import { settings } from "../../index.js";

export function createVariantsButtons(data) {
    const variants = Object.keys(nonogramsList[data]);
    const header = document.querySelector('.header');
    const variantsWrapper = document.querySelector('.variants-wrapper');
    variantsWrapper.innerHTML = '';
    variants.forEach(el => {
        const variantButton = document.createElement('button');
        variantsWrapper.appendChild(variantButton);
        variantButton.classList.add('variant', el);
        variantButton.textContent = el;
        variantButton.addEventListener('click', toggleVariant);
        if(el === settings.variant) {
            variantButton.classList.add('active');
        }
    })
}
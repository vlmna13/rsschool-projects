import { nonogramsList } from "../nonogramsList.js";
import { createNonogramField } from "../main/createNonogramField.js";
import { createLeftClue } from "../main/createLeftClue.js";

export function toggleVariant(event) {
    const variantsWrapper = document.querySelector('.variants-wrapper');
    const allVariants = variantsWrapper.querySelectorAll('button');
    if(event.target.classList.contains('.active')) {
        return;
    }
    allVariants.forEach(el => {
        el.classList.remove('active');
    })
    event.target.classList.add('active');
    let variant = event.target.textContent;
    const upside = document.querySelector('.up-side');
    upside.innerHTML = '';
    const downside = document.querySelector('.down-side');
    downside.innerHTML = '';
    const allLevels = document.querySelectorAll('.level');
    let level;
    allLevels.forEach(el => {
        if(el.classList.contains('active')){
            level = el.textContent;
        }
    })
    createLeftClue(variant, level);
    createNonogramField(variant, level);
}
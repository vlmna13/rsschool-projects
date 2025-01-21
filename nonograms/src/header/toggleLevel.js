import { nonogramsList } from "../nonogramsList.js";
import { createVariantsButtons } from "./createVariantsButtons.js";


export function toggleLevel(event) {
    const levelsWrapper = document.querySelector('.levels-wrapper');
    const levels = levelsWrapper.querySelectorAll('button');
    if(event.target.classList.contains('.active')) {
        return;
    }
    levels.forEach(el => {
        el.classList.remove('active');
    })
    event.target.classList.add('active');
    console.log(event.target.textContent);
    createVariantsButtons(event.target.textContent);
}
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
    const level = event.target.textContent;
    console.log(event.target.textContent);
    createVariantsButtons(level);
    const upside = document.querySelector('.up-side');
    upside.innerHTML = '';
    const downside = document.querySelector('.down-side');
    downside.innerHTML = '';
}
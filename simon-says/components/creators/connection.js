import { defaultParameters } from "../../index.js";

export function connection(event){
    const key = document.querySelector(`[data-index=${event.code}]`);
    if(!key) {
        return;
    }
    key.classList.add(defaultParameters.level)
    const field = document.querySelector('.field');
    field.innerText += event.key; 
    setTimeout(() => {
        key.classList.add(defaultParameters.level);
    }, 400);
}
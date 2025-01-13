import { defaultParameters } from "../../index.js";
import { checkInput } from "../checkInput.js";

export function connection(event){
    if(defaultParameters.isPressed) {
        return;
    }
    const key = document.querySelector(`[data-index="${event.code}"]`);
    if(!key || key.classList.contains('active')) {
        return;
    }
    defaultParameters.isPressed = true;
    key.classList.add('active');
    const field = document.querySelector('.field');
    field.textContent += key.textContent;
    setTimeout(() => {
        key.classList.remove('active');
        checkInput(key.textContent);
        defaultParameters.isPressed = false;
    }, 500);
}
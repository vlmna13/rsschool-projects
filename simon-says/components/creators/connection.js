import { defaultParameters } from "../../index.js";
import { checkInput } from "../checkInput.js";

export function connection(event){
    const key = document.querySelector(`[data-index="${event.code}"]`);
    if(!key) {
        return;
    }
    key.classList.add('active');
    const field = document.querySelector('.field');
    field.innerText = key.innerText;
    setTimeout(() => {
        key.classList.remove('active');
    }, 100);
    checkInput(key.innerText);
}
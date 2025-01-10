import { defaultParameters } from "../../index.js";
import { checkInput } from "../checkInput.js";

export function connection(event){
    const key = document.querySelector(`[data-index=${event.code}]`);
    if(!key) {
        return;
    }
    key.classList.add('active');

    console.log(defaultParameters.level)
    const field = document.querySelector('.field');
    // field.innerText += event.key; 
    const symbolWrapper = document.createElement('span');
    symbolWrapper.innerText = key.innerText;
    field.appendChild(symbolWrapper);
    setTimeout(() => {
        key.classList.remove('active');
    }, 400);
    checkInput();
}
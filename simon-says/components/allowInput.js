import { defaultParameters } from "../index.js";

export function allowInput() {
    const allbuttons = document.querySelectorAll('button');
    const field = document.querySelectorAll('.field');
    field.innerText = '';
    if(defaultParameters.isGamestarted = 'false') {
        defaultParameters.isGamestarted = 'false';
        allbuttons.forEach(button => {
            button.disabled = true;
        })
    } else {
        defaultParameters.isGamestarted = 'true';
        allbuttons.forEach(button => {
            button.disabled = false;
        })
    }

}
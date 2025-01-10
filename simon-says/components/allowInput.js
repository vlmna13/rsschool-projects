import { defaultParameters } from "../index.js";
import { connection } from "./creators/connection.js";

export function allowInput() {
    const allbuttons = document.querySelectorAll('button');
    const field = document.querySelectorAll('.field');
    field.innerText = '';
    if(defaultParameters.isGamestarted === false) {
        document.removeEventListener('keydown', connection);
        allbuttons.forEach(button => {
            button.disabled = true;
        })
    } else {
        document.addEventListener('keydown', connection);
        allbuttons.forEach(button => {
            button.disabled = false;
        });
    }

}
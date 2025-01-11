import { defaultParameters } from "../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "./keyboardData.js";
import { allowInput } from "./allowInput.js";

export function checkInput(key) {
    let value = key;
    const field = document.querySelector('.field');
    const allkeys = document.querySelectorAll('.key');
    let seq = Array.from(defaultParameters.sequence);
    let data = defaultParameters.data;
    if(value == data[seq[0]].inside) {
        seq.shift();
    } else {
        console.log('mistake');
        field.textContent = '';
        defaultParameters.mistakes -= 1;
        if(defaultParameters.mistakes === 0){
            alert('defeat')
        }
    }


}


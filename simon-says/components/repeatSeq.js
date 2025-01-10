import { defaultParameters } from "../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "./keyboardData.js";
import { lightUp } from "./lightUp.js";
import { allowInput } from "./allowInput.js";

export function repeatSeq() {
    const repeat = document.querySelector('.repeat');
    const field = document.querySelector('.field');
    field.innerText = '';
    defaultParameters.isGamestarted = false;
    console.log(defaultParameters.sequence);
    allowInput();
    lightUp();
}
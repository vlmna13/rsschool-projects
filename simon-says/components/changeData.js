import { defaultParameters } from "../index.js";
import { keyboardDataLetters } from "./keyboardData.js";
import { keyboardDataNumbers } from "./keyboardData.js";

export function changeData() {
    if (defaultParameters.level === 'easy') {
        defaultParameters.data = keyboardDataNumbers;
    } else if(defaultParameters.level === 'medium') {
        defaultParameters.data = keyboardDataLetters;
    } else {
        defaultParameters.data = [...keyboardDataNumbers, ...keyboardDataLetters];
    }
}
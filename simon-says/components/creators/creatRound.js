import { defaultParameters } from "../../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "../keyboardData.js";
import { createKeyboard } from "./createKeyBoard.js";
import { createMain } from "./createMain.js";

export function createRound() {
    let min = 0;
    let max = Math.floor(defaultParameters.data.length);
    for (let i = 0; i < 2; i++) {
        let number = Math.floor(Math.random() * (max - min) + min);
        defaultParameters.sequence.push(number);
    }
}


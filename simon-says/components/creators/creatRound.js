import { defaultParameters } from "../../index.js";
import { keyboardDataLetters, keyboardDataNumbers } from "../keyboardData.js";
import { createKeyboard } from "./createKeyBoard.js";
import { createMain } from "./createMain.js";

export function createRound() {
    let min = 0;
    let max = Math.floor(defaultParameters.data.length);
    let showSeq = [];
    for(let j = 0; j < defaultParameters.round; j++){
        for (let i = 0; i < 2; i++) {
            let number = Math.floor(Math.random() * (max - min) + min);
            defaultParameters.sequence.push(number);
            showSeq.push(defaultParameters.data[number].inside);
        }
    }
    console.log('sequence:  ' + showSeq);
}


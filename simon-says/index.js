import { createHeader } from "./components/creators/createHeader.js";
import { keyboardDataLetters, keyboardDataNumbers} from './components/keyboardData.js';
import {createMain} from './components/creators/createMain.js';
import { createRound } from "./components/creators/creatRound.js";

export let defaultParameters = {
    isGamestarted: false,
    level: 'easy',
    data: keyboardDataNumbers,
    round: 0,
    sequence: [],
    clue: 1,
    mistakes: 2,
}

createHeader();
createMain();






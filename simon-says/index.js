import { createHeader } from "./components/creators/createHeader.js";
import { keyboardDataLetters, keyboardDataNumbers} from './components/keyboardData.js';
import {createMain} from './components/creators/createMain.js';



createHeader();
createMain();

export const defaultParameters = {
    isGamestarted: false,
    level: 'easy',
    data: keyboardDataNumbers,
}
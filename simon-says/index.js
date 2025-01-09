import { createHeader } from "./components/creators/createHeader.js";
import { keyboardDataLetters, keyboardDataNumbers} from './components/keyboardData.js';



createHeader();

export const defaultParameters = {
    isGamestarted: false,
    level: 'easy',
    data: keyboardDataNumbers,
}
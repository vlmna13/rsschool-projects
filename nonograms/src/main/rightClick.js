import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";

export function rightClick(event, matrix) {
    if (event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
        event.target.textContent = 'X';
    } else if(event.target.textContent == 'X'){
        event.target.textContent = '';
    } else {
        event.target.textContent = 'X';
    }
    checkWin(matrix);
}
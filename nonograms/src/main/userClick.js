import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";

export function userClick(event, matrix ) {
    if(event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
    } else {
        event.target.classList.add('colored');
    }
    checkWin(matrix);
}
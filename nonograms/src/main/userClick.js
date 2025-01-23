import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";

export function userClick(event, matrix ) {
    let audioColored = new Audio('../sounds/colored.mp3');
    let audioWhite = new Audio('../sounds/white.mp3');
    if(event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
        event.target.textContent = '';
        audioWhite.play();
    } else {
        event.target.classList.add('colored');
        event.target.textContent = '';
        audioColored.play();
    }
    checkWin(matrix);
}
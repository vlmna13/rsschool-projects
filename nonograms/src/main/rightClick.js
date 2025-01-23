import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";

export function rightClick(event, matrix) {
    let audioCross = new Audio('../sounds/cross.mp3');
    if (event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
        event.target.textContent = 'X';
        audioCross.play();
    } else if(event.target.textContent == 'X'){
        event.target.textContent = '';
        let audioWhite = new Audio('../sounds/white.mp3');
        audioWhite.play();
    } else {
        event.target.textContent = 'X';
        audioCross.play();
    }
    checkWin(matrix);
}
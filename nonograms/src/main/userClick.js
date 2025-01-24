import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";
import { settings } from "../../index.js";

export function userClick(event, matrix ) {
    let audioColored = new Audio('../sounds/colored.mp3');
    let audioWhite = new Audio('../sounds/white.mp3');
    if(event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
        event.target.textContent = '';
        audioWhite.play();
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 0;
        console.log(settings.userMatrix)
    } else {
        event.target.classList.add('colored');
        event.target.textContent = '';
        audioColored.play();
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 1;
        console.log(settings.userMatrix)
    }
    checkWin(matrix);
}
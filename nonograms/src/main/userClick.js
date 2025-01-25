import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";
import { settings } from "../../index.js";
import { playPauseTimer } from "./playPauseTimer.js";


export function userClick(event, matrix ) {
    let audioColored = new Audio('../sounds/colored.mp3');
    let audioWhite = new Audio('../sounds/white.mp3');
    if(event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
        event.target.textContent = '';
        audioWhite.play();
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 0;
    } else {
        event.target.classList.add('colored');
        event.target.textContent = '';
        audioColored.play();
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 1;
    }
    checkWin(matrix);
    playPauseTimer();
    console.log(settings)
}
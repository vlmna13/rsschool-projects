import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";
import { settings } from "../../index.js";
import { playPauseTimer } from "./playPauseTimer.js";

export function rightClick(event, matrix) {
    let audioCross = new Audio('../sounds/cross.mp3');
    if (event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
        event.target.textContent = 'X';
        audioCross.play();
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 'X';
    } else if(event.target.textContent == 'X'){
        event.target.textContent = '';
        let audioWhite = new Audio('../sounds/white.mp3');
        audioWhite.play();
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 0;
    } else {
        event.target.textContent = 'X';
        audioCross.play();
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 'X';
    }
    checkWin(matrix);
    playPauseTimer();
}
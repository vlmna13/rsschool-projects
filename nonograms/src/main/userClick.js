import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";
import { settings } from "../../index.js";
import { playPauseTimer } from "./playPauseTimer.js";


export function userClick(event) {
    playPauseTimer();
    let audioColored = new Audio('./sounds/colored.mp3');
    let audioWhite = new Audio('./sounds/white.mp3');
    if(event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
        event.target.classList.remove('cross');
        if(!settings.isMute){
            audioWhite.play();
        }
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 0;
    } else {
        event.target.classList.add('colored');
        event.target.classList.remove('cross');
        if(!settings.isMute){
            audioColored.play();
        }
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 1;
    }
    checkWin();
}
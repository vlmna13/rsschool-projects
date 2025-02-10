import { nonogramsList } from "../nonogramsList.js";
import { checkWin } from "./checkWin.js";
import { settings } from "../../index.js";
import { playPauseTimer } from "./playPauseTimer.js";

export function rightClick(event) {
    playPauseTimer();

    let audioCross = new Audio('./sounds/cross.mp3');
    if (event.target.classList.contains('colored')) {
        event.target.classList.remove('colored');
        event.target.classList.add('cross');
        if(!settings.isMute){
            audioCross.play();
        }
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 'X';
    } else if(event.target.classList.contains('cross')){
        event.target.classList.remove('cross');
        let audioWhite = new Audio('./sounds/white.mp3');
        if(!settings.isMute){
            audioWhite.play();
        }
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 0;
    } else {
        event.target.classList.add('cross');
        if(!settings.isMute){
            audioCross.play();
        }
        settings.userMatrix[event.target.dataset.row][event.target.dataset.col] = 'X';
    }
    checkWin();   
}
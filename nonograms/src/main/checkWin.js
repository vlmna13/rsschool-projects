import { settings } from "../../index.js";
import { nonogramsList } from "../nonogramsList.js";
import { fillTable } from "./fillTable.js";
import { rightClick } from "./rightClick.js";
import { userClick } from "./userClick.js";
import { removeRightClick } from "./createNonogramField.js";

export function checkWin() {
    let userMatrix = Array.from({ length: settings.matrix.length }, () => Array(settings.matrix.length).fill(0));
    settings.userMatrix = userMatrix;
    const allCeils = document.querySelectorAll('.ceil');

    allCeils.forEach((el, index) => {
        if(el.classList.contains('colored')) {
            userMatrix[el.dataset.row][el.dataset.col] = 1;
        }
        if(el.classList.contains('cross')) {
            userMatrix[el.dataset.row][el.dataset.col] = 'X';
        }
    });
    let userMatrixFlat = settings.userMatrix.flat();
    let matrixFlat = settings.matrix.flat();
    userMatrixFlat.forEach((el, index) => {
        if(el === 'X'){
            userMatrixFlat[index] = 0;
        }
    });
    if(userMatrixFlat.every((element, index) => element === matrixFlat[index])) {
        allCeils.forEach((el, index) => {
            el.removeEventListener('click', userClick);
            el.removeEventListener('contextmenu', removeRightClick);
        })
        settings.isGameStarted = false;
        settings.intervalId = clearInterval(settings.intervalId);
        let gameInfo = [settings.level, settings.variant, settings.minutes, settings.seconds];
        let winTable = JSON.parse(localStorage.getItem('winTable')) || [];
        if(winTable.length >= 5) {
            winTable = winTable.slice(1);
        }
        winTable.push(gameInfo);
        localStorage.setItem('winTable', JSON.stringify(winTable));
        const appl = new Audio('./sounds/aplodismentu.mp3');
        if(!settings.isMute){
            appl.play();
        }
        settings.blockedCeil = false;
        fillTable();
    } 
}
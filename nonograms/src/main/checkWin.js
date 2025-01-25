import { settings } from "../../index.js";
import { nonogramsList } from "../nonogramsList.js";
import { fillTable } from "./fillTable.js";

export function checkWin(matrix) {
    let userMatrix = Array.from({ length: matrix.length }, () => Array(matrix.length).fill(0));
    settings.userMatrix = userMatrix;
    const ceilsWrapper = document.querySelector('.nonogram-wrapper');
    const allCeils = document.querySelectorAll('.colored');
    allCeils.forEach(el => {
        userMatrix[el.dataset.row][el.dataset.col] = 1;
    });
    let userMatrixFlat = userMatrix.flat();
    let matrixFlat = matrix.flat();
    userMatrixFlat.forEach(el => {
        if(el === 'X'){
            el = 0;
        }
    });

    if(userMatrixFlat.every((element, index) => element === matrixFlat[index])) {
        console.log(settings.isGameStarted, settings.intervalId)
        settings.isGameStarted = false;
        settings.intervalId = clearInterval(settings.intervalId);
        console.log(settings.isGameStarted, settings.intervalId)

        let gameInfo = [settings.level, settings.variant, settings.minutes, settings.seconds];
        let winTable = JSON.parse(localStorage.getItem('winTable')) || [];
        if(winTable.length >= 5) {
            winTable = winTable.slice(1);
        }
        winTable.push(gameInfo);
        localStorage.setItem('winTable', JSON.stringify(winTable));
        fillTable();
    } 
}
import { nonogramsList } from "../nonogramsList.js";

export function checkWin(matrix) {
    let userMatrix = Array.from({ length: matrix.length }, () => Array(matrix.length).fill(0));
    const ceilsWrapper = document.querySelector('.nongram-wrapper');
    const allCeils = document.querySelectorAll('.colored');
    allCeils.forEach(el => {
        userMatrix[el.dataset.row][el.dataset.col] = 1;
    });
    let userMatrixFlat = userMatrix.flat();
    let matrixFlat = matrix.flat();
    if(userMatrixFlat.every((element, index) => element === matrixFlat[index])) {
        console.log('win');
    }    
}
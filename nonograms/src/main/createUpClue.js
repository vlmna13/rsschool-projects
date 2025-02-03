import { nonogramsList } from "../nonogramsList.js";
import { rotateMatrix } from "./rotateMatrix.js";

export function createUpClue(matrix) {
    let newMatrix = rotateMatrix(matrix);
 
    const upside = document.querySelector('.up-side');
    const empty = document.createElement('div');
    empty.classList.add('empty');
    upside.appendChild(empty);
    const upClue = document.createElement('div');
    upClue.classList.add('up-clue');
    upside.appendChild(upClue);
    for (let i = 0; i < newMatrix.length; i++) {
        const upclueLine = document.createElement('div');
        upclueLine.classList.add('up-clue-line');
        upClue.appendChild(upclueLine);
        let counter = 0;
        for (let j = newMatrix[i].length - 1; j >= 0; j--) {
            if (newMatrix[i][j] === 1) {
                counter += 1;
            } else {
                if (counter > 0) {
                    const clueEl = document.createElement('p');
                    clueEl.classList.add('clue-el');
                    clueEl.textContent = counter;
                    upclueLine.appendChild(clueEl);
                    counter = 0;
                };
            };
        };
        if (counter > 0) {
            const clueEl = document.createElement('p');
            clueEl.classList.add('clue-el');
            clueEl.textContent = counter;
            upclueLine.appendChild(clueEl);
        };
    };
}
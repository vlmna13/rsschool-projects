import { nonogramsList } from "../nonogramsList.js";
import { rotateMatrix } from "./rotateMatrix.js";

export function createUpClue(matrix) {
    let newMatrix = rotateMatrix(matrix)
    const downside = document.querySelector('.down-side');
    const leftClue = document.createElement('div');
    leftClue.classList.add('left-clue');
    downside.appendChild(leftClue);
    // let choosedLevel = level;
    // let nonogramVariant = nonogramsList[choosedLevel][variant];
    for(let i = 0; i < newMatrix.length; i++) {
        const leftclueLine = document.createElement('div');
        leftclueLine.classList.add('left-clue-line');
        leftClue.appendChild(leftclueLine);
        let counter = 0;
        for(let j = 0; j < newMatrix[i].length; j++) {
            if(matrix[i][j] === 1) {
                counter += 1;
            } else {
                if (counter > 0) {
                    const clueEl = document.createElement('p');
                    clueEl.classList.add('clue-el');
                    clueEl.textContent = counter;
                    leftclueLine.appendChild(clueEl);
                    counter = 0;
                }
            }
        }
        if (counter > 0) {
            const clueEl = document.createElement('p');
            clueEl.classList.add('clue-el');
            clueEl.textContent = counter;
            leftclueLine.appendChild(clueEl);
        }
    }
}